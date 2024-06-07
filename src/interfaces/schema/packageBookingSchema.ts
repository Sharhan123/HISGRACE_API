import { Schema } from "mongoose"



export interface IPperson {
    adult: number, child: number
}

export interface IPperiod {
    time: string, date: Date,meridian:string
}
export interface IPpickup {
    bookingName: string
    email: string
    mobile: number
    address: string,
    city: string,
    postCode: string,
    state: string
}

export interface IPbooking {
    _id: Schema.Types.ObjectId
    userId:Schema.Types.ObjectId
    person: IPperson,
    period: IPperiod,
    package:Schema.Types.ObjectId
    pickupDetails:IPpickup
    status:String,
}

export interface IPbookingAuth{
    package:Schema.Types.ObjectId
    userId:Schema.Types.ObjectId
    person: IPperson,
    period: IPperiod,
    pickupDetails:IPpickup
}

