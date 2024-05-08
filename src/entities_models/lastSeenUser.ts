import mongoose, { Schema, Document } from 'mongoose';
import { Ilastseen } from '../interfaces/schema/chatSchema';



const MessageSchema: Schema = new Schema({
  userId:{type:String,required:true},
  last:{type:Date,required:true}
});

const lastseenSchema = mongoose.model<Ilastseen & Document>('lastSeens', MessageSchema);

export default lastseenSchema;
