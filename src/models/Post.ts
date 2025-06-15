import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../types";

export interface IPostModel extends Omit<IPost, "_id">, Document {}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPostModel>("Post", PostSchema);
