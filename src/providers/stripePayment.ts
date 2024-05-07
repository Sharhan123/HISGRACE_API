import Stripe from "stripe"
const apiVersion = "2023-10-16" as "2024-04-10"


 
export const stripe = new Stripe(process.env.STRIPE_KEY as string,{
    apiVersion:apiVersion
}) 