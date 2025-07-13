import mongoose, { Schema, Document } from "mongoose";

// Correct TypeScript interface for a Message
export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  text?: string;
  media?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Message schema
const messageSchema: Schema<IMessage> = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    media: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export Message model
export const Message = mongoose.model<IMessage>("Message", messageSchema);
