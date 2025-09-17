import { NextResponse } from "next/server";
import { connectDB } from "../../../../Db/Connect";
import { Task } from "../../../../Model/TaskModel";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const selectedDateTime = new Date(`${body.date}T${body.time}`);
  if (selectedDateTime < new Date()) {
    return NextResponse.json(
      { error: "Cannot create a task in the past" },
      { status: 400 }
    );
  }
  const newTask = await Task.create(body);
  return NextResponse.json(newTask, { status: 201 });
}
