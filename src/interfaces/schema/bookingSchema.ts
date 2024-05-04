import { Schema } from "mongoose"

export interface Ilocation {
    name: string,
    city: string,
    country: string,
    county: string,
    lat: number,
    lon: number,
    address_line1: string,
    address_line2: string,
    formatted: string
    country_code: string,
    postcode: string
    state: string
    state_code: string
    place_id: string
}

export interface Iperson {
    adult: number, child: number
}

export interface Iperiod {
    time: string, date: Date
}
export interface Ipickup {
    bookingName: string
    email: string
    mobile: number
    address: string,
    city: string,
    postCode: string,
    state: string
}

export interface Ibooking {
    _id: Schema.Types.ObjectId
    userId:Schema.Types.ObjectId
    from: Ilocation
    to: Ilocation
    distance: number,
    person: Iperson,
    period: Iperiod,
    vehicle: Schema.Types.ObjectId,
    totalKm: number,
    totalPrice: number,
    driver: Schema.Types.ObjectId,
    pickupDetails:Ipickup
    payment:boolean
    status:String
}

export interface IbookingAuth{
    from: Ilocation
    to: Ilocation
    distance: number,
    person: Iperson,
    period: Iperiod,
    vehicle: Schema.Types.ObjectId,
    totalKm: number,
    totalPrice: number,
    driver: Schema.Types.ObjectId,
    pickupDetails:Ipickup
    payment:boolean
}

