import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from '../interfaces/schema/chatSchema';



const MessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  reciever: { type: String, required: true },
  sender:{type:String,required:true},
  time: { type: Date, default: Date.now }
});

const Message = mongoose.model<IMessage & Document>('Messages', MessageSchema);

export default Message;
