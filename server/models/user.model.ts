import mongoose, { Schema, Document } from "mongoose";

// 1. Create an interface for TypeScript type safety
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// 2. Use PascalCase for model names
export const User = mongoose.model<IUser>("User", userSchema);
