"use client";
import React, { useState } from "react";
import { UseStores } from "@/stores/Store";
function CreateTask() {
  const { user } = UseStores();
  const [form, setForm] = useState({
    task: "",
    date: "",
    time: "",
    userId: user?.id,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.task || !form.date || !form.time||!form.userId) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Task Created Successfully!");
        setForm((prev) => ({ ...prev, task: "", date: "", time: "" }));
      } else {
        alert("❌ Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="w-full hover:bg-gray-300 cursor-pointer rounded-xl shadow-xs shadow-blue-800 p-2"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default CreateTask;
