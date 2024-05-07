import { Schema } from "mongoose";

export interface IMessage{
    content: string;
    reciever: string;
    time:Date
    sender:string

}

  export interface ImessageRes extends IMessage{
    _id:Schema.Types.ObjectId
  }