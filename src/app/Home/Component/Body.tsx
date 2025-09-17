"use client";
import { UseStores } from "@/stores/Store";
import React, { useEffect, useState } from "react";

interface Task {
  _id: string;
  task: string;
  date: string;
  time: string;
}

function Body() {
  const { user } = UseStores();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks/${user?.id}`);
      const data = await res.json();
      setTasks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching tasks", err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error  tasks", err.message);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingTask) return;
    const selectedDateTime = new Date(
      `${editingTask.date}T${editingTask.time}`
    );
    if (selectedDateTime < new Date()) {
      alert("❌ Cannot set task in the past!");
      return;
    }
    try {
      const res = await fetch(`/api/tasks/${editingTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask),
      });

      if (res.ok) {
        setTasks((prev: Task[]) =>
          prev.map((t: Task) => (t._id === editingTask._id ? editingTask : t))
        );
        setEditingTask(null);
      } else {
        alert("Failed to update task");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error tasks", err.message);
      }
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">📌 Your Tasks</h2>

      {tasks.length === 0 && <p>No tasks found. Create one!</p>}

      {tasks.map((task) =>
        editingTask?._id === task._id ? (
          <div
            key={task._id}
            className="flex gap-2 border p-3 rounded-lg bg-gray-100"
          >
            <input
              type="text"
              value={editingTask.task}
              onChange={(e) =>
                setEditingTask({ ...editingTask, task: e.target.value })
              }
              className="p-1 border rounded"
            />
            <input
              type="date"
              value={editingTask.date}
              onChange={(e) =>
                setEditingTask({ ...editingTask, date: e.target.value })
              }
              className="p-1 border rounded"
            />
            <input
              type="time"
              value={editingTask.time}
              onChange={(e) =>
                setEditingTask({ ...editingTask, time: e.target.value })
              }
              className="p-1 border rounded"
            />
            <button
              onClick={handleUpdate}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTask(null)}
              className="px-2 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            key={task._id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold">{task.task}</p>
              <p className="text-sm text-gray-600">
                {task.date} at {task.time}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTask(task)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Body;
