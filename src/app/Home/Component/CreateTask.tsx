"use client";
import React, { useState } from "react";
import { UseStores } from "@/stores/Store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

interface TaskInput {
  task: string;
  date: string;
  time: string;
  userId?: string;
}

const createTaskApi = async (task: TaskInput) => {
  const res = await axios.post("/api/task", task);
  return res.data;
};

function CreateTask() {
  const { user } = UseStores();
  const [form, setForm] = useState<TaskInput>({
    task: "",
    date: "",
    time: "",
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      setForm({ task: "", date: "", time: "" });
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
      toast.success("✅Task Created Successfully!");
    },
    onError: () => {
      toast.error(" Failed to create task");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.task || !form.date || !form.time) {
      toast.warning(" Please fill all fields");
      return;
    }
    mutate({ ...form, userId: user?.id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-3 gap-4 max-w-[300px] w-fit min-w-[300px] bg-white rounded-xl shadow-md"
    >
      <div>
        <input
          type="text"
          name="task"
          placeholder="Enter your Task"
          className="w-full p-2 outline-none border rounded-xl"
          value={form.task}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="date"
          name="date"
          className="w-full p-2 outline-none border rounded-xl"
          value={form.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="time"
          name="time"
          className="w-full p-2 outline-none border rounded-xl"
          value={form.time}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full hover:bg-gray-300 cursor-pointer rounded-xl shadow-xs shadow-blue-800 p-2"
      >
        {isPending ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default CreateTask;
