import { Schema,models,model,Document } from "mongoose";

export interface ITag extends Document{
  name:string;
  description:string;
  questions:Schema.Types.ObjectId[];
  followers:Schema.Types.ObjectId[];
  createdAt:Date;  
}

const tagSchema = new Schema({
    name: { type: String, required: true,unique:true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Assuming 'Question' is the related model name
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Assuming 'User' is the related model name
  createdAt: { type: Date, default: Date.now },
})

const Tag =  models.Tag || model<ITag>("Tag",tagSchema)

export default Tag;