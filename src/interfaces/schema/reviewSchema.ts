export interface Ireview{
    user:any
    review:String,
    rating:Number
    vehicleId:any
    driverId:any
    vehicle:boolean
}

export interface IreviewRes extends Ireview{
_id:any
}