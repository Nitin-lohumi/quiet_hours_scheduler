import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  task: string;
  date: string;
  time: string;
  userId: string;
  notified: boolean;
}
const TaskSchema = new Schema<ITask>(
  {
    task: { type: String, required: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    notified: { type: Boolean, required: false, index: true },
  },
  { timestamps: true }
);

export const Task =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
