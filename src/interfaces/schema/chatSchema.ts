import { Schema } from "mongoose";

export interface IMessage{
    content: string | Blob;
    reciever: string;
    time:Date
    sender:string
    contentType:string
}

export interface Ilastseen{
  userId:string,
  last:Date
}
export interface IlastseenRes extends Ilastseen{
  _id:any
}


  export interface ImessageRes extends IMessage{
    _id:Schema.Types.ObjectId
  }