import { NextResponse } from "next/server";
import { connectDB } from "../../../../../Db/Connect";
import { Task } from "../../../../../Model/TaskModel";

interface Props {
  params: { id: string };
}
export async function GET(req: Request, { params }: Props) {
  await connectDB();
  const { id } = params;
  const tasks = await Task.find({ userId: id }).sort({
    date: 1,
    time: 1,
  });
  return NextResponse.json(tasks);
}
export async function PUT(req: Request, { params }: Props) {
  await connectDB();
  const { id } = params;
  const body = await req.json();
  const selectedDateTime = new Date(`${body.date}T${body.time}`);
  if (selectedDateTime < new Date()) {
    return NextResponse.json(
      { error: "Cannot set task in the past" },
      { status: 400 }
    );
  }
  const updatedTask = await Task.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(updatedTask);
}

export async function DELETE(req: Request, { params }: Props) {
  await connectDB();
    const { id } = params;
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task deleted successfully" });
}
