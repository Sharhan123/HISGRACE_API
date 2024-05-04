import { Request, Response } from "express";
import { Iuser, IuserApiAuth, IuserApiRes, IuserAuth, IuserReq } from "../interfaces/schema/userSchema";
import { ItempUserReq } from "../interfaces/schema/tempUser";
import { userUseCase } from '../useCases/userUseCase'
import { GenerateOtp } from "../providers/generateOtp";
import { encrypting } from "../providers/encrypt";
import { STATUS_CODES } from '../constants/httpStatusCodes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { adminUseCase } from "../useCases/adminUseCase";
import userSchema from "../entities_models/userModel";
import { log } from "console";
import { removeImage, uploadImageToCloudinary } from "../providers/cloudinart";
import { stripe } from '../providers/stripePayment'
import { bookingusecase } from "../useCases/bookingUseCase";

let mainData: any

export class userController {
    constructor(
        private readonly userUseCase: userUseCase,
        private readonly otpGenerator: GenerateOtp,
        private readonly encrypt: encrypting,
        private readonly bookingusecase: bookingusecase

    ) { }

    async userRegister(req: Request, res: Response) {
        try {
            const { name, email, password, cpassword }: IuserReq = req.body
            console.log(req.body, 'this is body');
            const id = undefined
            const isEmailExist = await this.userUseCase.isEmailExist(email, id)
            console.log(process.env.EMAIL_ID);

            if (isEmailExist == null) {
                if (password === cpassword) {
                    const otp = this.otpGenerator.generateOTP()
                    const securePass = await this.encrypt.encrypt(password.toString())
                    const user: ItempUserReq = { name: name, email: email, password: securePass, otp: otp }
                    const tempUser = await this.userUseCase.saveTempUser(user)
                    const emailS: string = tempUser.email.toString()
                    this.userUseCase.sendTimeoutOTP(tempUser._id, emailS, otp, name.toString())

                    res.status(STATUS_CODES.OK).json({ message: 'Success', token: tempUser.userAuth })
                } else {
                    res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Confirm password and password does not match', role: 'password' })
                }
            } else {
                res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Entered email address already exist please login ', role: 'email' })
            }


        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })
        }
    }

    async verifyOtp(req: Request, res: Response) {
        try {
            console.log('................................otp');

            const { value } = req.body;
            const token = req.headers.authorization;
            console.log(req.headers.authorization);

            if (token) {
                console.log(token);
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                console.log(decoded);

                const user = await this.userUseCase.findTempUserByID(decoded.id)
                if (user) {

                    if (value == user.otp) {
                        const savedData = await this.userUseCase.saveUser({
                            name: user.name,
                            email: user.email,
                            password: user.password
                        })
                        console.log(savedData);


                        return res.status(STATUS_CODES.OK).json({ message: 'success', token: savedData.refreshToken })

                    } else {
                        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'entered otp is not valid try again' })
                    }
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Otp time out register again' })
                }


            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized token' })
            }

        } catch (err) {
            console.log(err + 'from here');

        }
    }
    async resendOtp(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (token) {
                console.log(token);
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                console.log(decoded);

                const user = await this.userUseCase.findTempUserByID(decoded.id)
                if (user) {
                    const otp = this.otpGenerator.generateOTP()
                    this.userUseCase.resendOtp(user._id, user.email.toString(), otp, user.email.toString())
                    return res.status(STATUS_CODES.OK).json({ message: 'success' })
                } else {
                    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Otp time out register again' })
                }


            } else {
                res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized token' })
            }
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })

        }
    }
    async userSignin(req: Request, res: Response) {
        try {

            const { email, password } = req.body
            const authData = await this.userUseCase.verifyLogin(email, password)
            return res.status(authData.status).json({ authData: authData })

        } catch (err) {
            console.log(err);

        }
    }
    async checkUserBlocked(req: Request, res: Response) {
        try {


            const id = req.params.id
            
            const user = await this.userUseCase.findUserById(id)
            

            if (user?.isBlocked === true) {
                return res.status(STATUS_CODES.OK).json({ success: true, blocked: true })
            }
            return res.status(STATUS_CODES.OK).json({ success: false, blocked: false })

        } catch (err) {
            console.log(err);

        }
    }
    async forgetPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const id = undefined
            const user = await this.userUseCase.isEmailExist(email, id)
            if (user) {
                const otp = this.otpGenerator.generateOTP()
                this.userUseCase.forgetTimeout(email, otp, 'Forget password')
                return res.status(STATUS_CODES.OK).json({ message: 'success', email: email })

            } else {
                return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Entered email address does not exist' })
            }
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })

        }
    }

    async verifyForgetOtp(req: Request, res: Response) {
        try {
            const { value, email } = req.body
            const id = undefined
            const user = await this.userUseCase.isEmailExist(email, id)
            if (user) {
                if (parseInt(value) === user.otp) {
                    return res.status(STATUS_CODES.OK).json({ message: 'success' })
                } else {
                    return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Entered otp is invalid please try again' })
                }
            } else {
                return res.status(STATUS_CODES.FORBIDDEN).json({ message: "User not found please register" })
            }
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })

        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { pass, cpass, email } = req.body
            const id = undefined
            const user = await this.userUseCase.isEmailExist(email, id)
            if (user) {
                if (pass !== cpass) {
                    return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Password and confirm password does not match' })
                }
                const encrypted = await this.encrypt.encrypt(pass)

                const updated = await this.userUseCase.resetPassword(email, encrypted)
                return res.status(STATUS_CODES.OK).json({ message: 'success', updated })

            } else {
                return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'User does not found please register' })
            }


        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.OK).json({ message: err })

        }
    }
    async getUserData(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (token) {

                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload

                const user = await this.userUseCase.findUserById(decoded.id)
                if (user) {
                    return res.status(STATUS_CODES.OK).json({ message: 'success', data: user })
                }
                return res.status(STATUS_CODES.FORBIDDEN).json({ message: "The user does not exist on the user id" })
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "User verification not found" })
        } catch (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })
        }
    }
    async updateImage(req: Request, res: Response) {
        try {
            const { image, id } = req.body


            const isExist = await this.userUseCase.findUserById(id)
            if (isExist) {
                const imageUrl = await uploadImageToCloudinary(image)
                if (isExist.profile) {
                    await removeImage(isExist.profile)
                }
                const data = await this.userUseCase.ProfileImage(imageUrl, id)
                return res.status(STATUS_CODES.OK).json({ message: 'success', data })
            }
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'User does not exist' })
        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err })
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const { name, email, age, gender, language, mobile, secondaryMobile } = req.body
            const token = req.headers.authorization;
            if (token) {

                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                const user = await this.userUseCase.isEmailExist(email, decoded.id)

                if (user) {
                    return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Your profile is not updated , email address already exist', role: 'email' })
                }
                const data = await this.userUseCase.updateUser(decoded.id, { name, email, age, gender, language, mobile, secondaryMobile })

                return res.status(STATUS_CODES.OK).json({ message: 'success', data })

            }
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Your authentication token is missing please provide token' })


        } catch (err) {
            console.log(err);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })
        }
    }

    async bookingSession(req: Request, res: Response) {
        try {
            const data = req.body
            const token = req.headers.authorization;
            if (token) {
                
                
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload
                
                const resData = {
                    ...data,
                    userId: decoded.id,
                }

                
                const line_items = [
                    {
                        price_data: {
                            currency: "INR",
                            product_data: {
                                name: `Taxi booking charge of trip ${data.from.name || data.from.city} TO ${data.to.name || data.to.city}`,
                            },
                            unit_amount: Math.round(Math.max(500,0.3 * data.totalPrice) *100),  
                        },
                        quantity: 1,

                    },
                ]
                
                const saved:any = await this.bookingusecase.saveBooking(resData)
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: line_items,
                    mode: "payment",
                    success_url: "http://localhost:5173/success",
                    cancel_url: "http://localhost:5173/failure",
                    billing_address_collection: "required",
                    metadata: {
                        userId: JSON.stringify(saved._id)
                    }
                })

                return res.status(STATUS_CODES.OK).json({ session: session.id })
            }

        } catch (err) {
            console.log(err)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })
        }
    }

    async webhookRouter(req: Request, res: Response) {
        console.log("hello........................................");

        try {
            const event = req.body
            const stripeSignature: string | string[] = req.headers['stripe-signature'] || ''
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;
                const userId = session.metadata.userId;
                await this.bookingusecase.updatePayment(JSON.parse(userId),true)
                res.status(200).json({ received: true });
            } 
        } catch (err) {
            console.log(err)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })

        }
    }

}
