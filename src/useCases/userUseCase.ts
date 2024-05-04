import { UserRepository } from "../infrastructure/respostories/userRepository";
import { tempUserRepository } from "../infrastructure/respostories/tempUserRepository";
import { Iuser, IuserRes, IuserAuth, IuserApiRes, IuserApiAuth, IuserEdit } from "../interfaces/schema/userSchema";
import { ItempUserReq, ItempUserRes } from "../interfaces/schema/tempUser";
import { JWTTOKEN } from "../providers/jwt";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import { mailSender } from "../providers/nodeMailer";
import { Schema } from "mongoose";
import { encrypting } from "../providers/encrypt";
import { ROLES } from "../constants/constants";
export class userUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tempUserRepository: tempUserRepository,
        private readonly JWTTOKEN: JWTTOKEN,
        private readonly mailer : mailSender,
        private readonly encrypt: encrypting,
    ) { }

    async isEmailExist(email: String,id:Schema.Types.ObjectId | undefined): Promise<Iuser | null> {
        
        return await this.userRepository.findByEmail(email,id)
    }
    async saveUser(userData: IuserAuth): Promise<IuserApiAuth> {
        const user:any = await this.userRepository.saveUser(userData)
        const accessToken =  this.JWTTOKEN.generateAccessToken(user._id,ROLES.USER)
        const refreshToken =  this.JWTTOKEN.generateRefreshToken(user._id,user.name,user.email,ROLES.USER)
        
        
        return {
            status:STATUS_CODES.OK,
            message:'Success',
            data:user,
            role:'',
            accessToken:accessToken,
            refreshToken:refreshToken
        }
    }

    async saveTempUser(userData:ItempUserReq):Promise<ItempUserRes>{
        const user = await this.tempUserRepository.saveUser(userData)

        const userAuth = this.JWTTOKEN.generateTempToken(user._id)

        return {...JSON.parse(JSON.stringify(user)),userAuth}
    }
    async findUserById(userId:any):Promise<Iuser | null>{
        try{

            return await this.userRepository.findById(userId)
        }catch(err){
            throw err
        }
    }
    sendTimeoutOTP(id: Schema.Types.ObjectId, email: string, OTP: number,name:string) {
        try {
            this.mailer.sendOTP(email, OTP ,name)
                    
            setTimeout(async() => {
                await this.tempUserRepository.unsetOtp(id, email)
            }, 60000)

        } catch (error) {
            console.log(error);
            throw Error('Error while sending timeout otp')
        }
    }
    forgetTimeout(email:string,otp:number,name:string){
        this.mailer.sendOTP(email,otp,name)
        this.userRepository.setotp(email,otp)
        setTimeout(async() => {
            await this.userRepository.unsetOtp(email)
        }, 60000)
    }
    
    resendOtp(id:Schema.Types.ObjectId,email:string,otp:number,name:string){
        this.tempUserRepository.resendSave(id,otp)
        this.mailer.sendOTP(email,otp,name)
        setTimeout(async() => {
            await this.tempUserRepository.unsetOtp(id, email)
        }, 60000)

    }

    findTempUserByID(id:Schema.Types.ObjectId):Promise<ItempUserRes | null>{
            return this.tempUserRepository.findById(id)    
    } 

    async verifyLogin(email: string, password: string): Promise<IuserApiAuth> {
        const id = undefined
        const userData = await this.userRepository.findByEmail(email,id)
        if (userData !== null) {
            if (userData.isBlocked) {
                return {
                    status: STATUS_CODES.FORBIDDEN,
                    message: 'Sorry, you are not allowed to login admin blocked your account',
                    role:'email',
                    data: null,
                    accessToken: '',
                    refreshToken: ''
                }
            } else {
                const passwordMatch = await this.encrypt.compare(password, userData.password as string)
                if (passwordMatch) {
                const accessToken = this.JWTTOKEN.generateAccessToken(userData._id,ROLES.USER)
                let refreshToken:String 
                if(userData.profile){

                    refreshToken = this.JWTTOKEN.generateRefreshTokenImage(userData._id,userData.name,userData.email,userData.profile,ROLES.USER)
                }else{
                    refreshToken = this.JWTTOKEN.generateRefreshToken(userData._id,userData.name,userData.email,ROLES.USER)
                }
                    return {
                        status: STATUS_CODES.OK,
                        message: 'Success',
                        role:'',
                        data: userData,
                        accessToken,
                        refreshToken
                    }
                }else{
                    return {
                        status: STATUS_CODES.UNAUTHORIZED,
                        message: 'Entered password is incorrect',
                        role:'password',
                        data: null,
                        accessToken: '',
                        refreshToken: ''
                    }
                }
            }
        }

        return {
            status: STATUS_CODES.UNAUTHORIZED,
            message: 'The user does not exist please register ',
            role:'email',
            data: null,
            accessToken: '',
            refreshToken: ''
        };

    }

    async resetPassword(email:string,pass:string){
        return this.userRepository.updatePassword(pass,email)
    }

    async ProfileImage(image:string,id:Schema.Types.ObjectId){
        return await this.userRepository.updateImage(image,id)
    }
    async updateUser(id:Schema.Types.ObjectId, user:IuserEdit){
        return await this.userRepository.updateUserDetails(id,user)
    }
    

}