import express from "express";
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from "../routes/userRoutes";
import vehicleRouter from "../routes/vehicleRoutes";
import adminRouter from "../routes/adminRoutes";
import packageRouter from "../routes/packageRoutes";
import driverRouter from "../routes/driverRoutes";
import bookingRouter from "../routes/bookingRoutes";
import chatRouter from "../routes/chatRoutes";
import packageBookingRouter from "../routes/packageBookingRoutes";
dotenv.config()




export const createServer = () => {
    try {

        const app = express()

        app.use(express.json({ limit: '50mb' }))
        app.use(express.urlencoded({ limit: '50mb', extended: true }))
        app.use('/images', express.static(path.join(__dirname, '../../../images')))
        // const corsOptions = {
        //     origin: '*', 
        //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
        //     allowedHeaders: ['Content-Type', 'Authorization'], 
        //     preflightContinue: true,
        //     optionsSuccessStatus: 204
        //   };

        //   app.use(cors(corsOptions));

        //   app.options('*', cors(corsOptions));

        // const allowedOrigins = ['https://dns-manager-ui.vercel.app/'];

        app.use(cors({
            origin: function (origin, callback) {
                callback(null, true);
            }
        }));
        app.use('/',(req,res)=>{
            res.json({message:'ok'})
        })
        app.use('/api/user', userRouter)
        app.use('/api/vehicle', vehicleRouter)
        app.use('/api/admin', adminRouter)
        app.use('/api/package', packageRouter)
        app.use('/api/driver', driverRouter)
        app.use('/api/bookings', bookingRouter)
        app.use('/api/chat', chatRouter)
        app.use('/api/packageBooking', packageBookingRouter)
        return app

    } catch (err) {
        console.log('error logging from createServer, from app.ts');
        console.error('error caught from app')
        console.log((err as Error).message);
    }

}

