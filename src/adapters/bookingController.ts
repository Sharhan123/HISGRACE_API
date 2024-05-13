import { Request, Response } from "express";
import { STATUS_CODES } from '../constants/httpStatusCodes'
import { adminUseCase } from "../useCases/adminUseCase";
import { JWTTOKEN } from "../providers/jwt";
import { ROLES } from "../constants/constants";
import mongoose from "mongoose";
import { bookingusecase } from "../useCases/bookingUseCase";
import jwt, { JwtPayload } from "jsonwebtoken"
import { stripe } from "../providers/stripePayment";
import { vehicleUseCase } from "../useCases/vehicleUseCase";
import { IvehicleRes } from "../interfaces/schema/vehicleSchema";
export class bookingController {
    constructor(
        private readonly bookingusecase: bookingusecase,
        private readonly vehicleusecase: vehicleUseCase
    ) { }
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
                            unit_amount: Math.round(Math.max(500, 0.3 * data.totalPrice) * 100),
                        },
                        quantity: 1,

                    },
                ]

                const saved: any = await this.bookingusecase.saveBooking(resData)
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
                console.log(userId, session, 'is this is ok....................................');
                const bookingData = await this.bookingusecase.updatePayment(JSON.parse(userId), true)
                let booking:string[]  = [] 

                if (bookingData?.type === 'one-way') {
                    const startDate = bookingData.period.date;
                    booking.push(startDate.toISOString().split('T')[0]);
                } else {
                    const startDate = bookingData?.period.date 
                    const endDate = bookingData?.returnDate;

                    if (startDate && startDate === endDate) {
                        booking.push(startDate.toISOString().split('T')[0]);
                    } else {
                        if(startDate && endDate){

                            const datesBetween = this.getDatesBetween(startDate, endDate);
                            booking = [...booking, ...datesBetween];
                        }  
                    }
                }

                await this.vehicleusecase.updateBooking(bookingData?.vehicle, booking)
                res.status(200).json({ received: true });
            }
        } catch (err) {
            console.log(err)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Sorry, the server is facing an issue will be fixed soon.' })

        }
    }
    getDatesBetween(startDate: Date, endDate: Date): string[] {
        const dates: string[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            dates.push(currentDate.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }
    async getBookings(req: Request, res: Response) {
        try {
            const data = await this.bookingusecase.findAll()
            return res.status(STATUS_CODES.OK).json({ message: "success", data })
        } catch (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'soryy' })
        }
    }
    async getBookingByUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization;
            if (token) {
                const decoded = jwt.verify(token?.slice(7), process.env.JWT_SECRET as string) as JwtPayload

                const data = await this.bookingusecase.findByUser(decoded.id)
                return res.status(STATUS_CODES.OK).json({message:'success',data})
            }
            return res.status(STATUS_CODES.UNAUTHORIZED).json({message:'Please try login again and try again '})
        } catch (err) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' })

        }
    }
    async bookingStatus(req:Request,res:Response){
        try{
            const {id,status} = req.body

            const data = await this.bookingusecase.bookingStatus(id,status)
            return res.status(STATUS_CODES.OK).json({message:"success",data})
        }catch(err){
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'sorry we are facing some issues with our server' })
        }
    }
}



