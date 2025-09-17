"use client";
import { UseStores } from "@/stores/Store";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Task {
  _id: string;
  task: string;
  date: string;
  time: string;
  notified: boolean;
  expire: boolean;
}

const fetchTasks = async (userId: string): Promise<Task[]> => {
  const res = await axios.get(`/api/tasks/${userId}`);
  return res.data;
};

const deleteTaskApi = async (id: string) => {
  await axios.delete(`/api/tasks/${id}`);
};

const updateTaskApi = async (task: Task) => {
  await axios.put(`/api/tasks/${task._id}`, task);
};

function Body() {
  const { user } = UseStores();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks", user?.id],
    queryFn: () => fetchTasks(user?.id || ""),
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] });
      setEditingTask(null);
    },
  });

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure to delete this task?")) return;
    deleteMutation.mutate(id);
  };

  const handleUpdate = () => {
    if (!editingTask) return;
    const selectedDateTime = new Date(
      `${editingTask.date}T${editingTask.time}`
    );
    if (selectedDateTime < new Date()) {
      alert("❌ Cannot set task in the past!");
      return;
    }
    updateMutation.mutate(editingTask);
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">📌 Your Tasks</h2>
      {isLoading && <p>fetching....</p>}
      {tasks?.map((task) =>
        editingTask?._id === task._id ? (
          <div
            key={task._id}
            className="flex flex-col gap-2 p-3 rounded-lg bg-gray-100"
          >
            <input
              type="text"
              value={editingTask.task}
              onChange={(e) =>
                setEditingTask({ ...editingTask, task: e.target.value })
              }
              className="p-1 shadow-xs shadow-gray-200 rounded"
            />
            <input
              type="date"
              value={editingTask.date}
              onChange={(e) =>
                setEditingTask({ ...editingTask, date: e.target.value })
              }
              className="p-1 shadow-xs shadow-gray-200 rounded"
            />
            <input
              type="time"
              value={editingTask.time}
              onChange={(e) =>
                setEditingTask({ ...editingTask, time: e.target.value })
              }
              className="p-1 shadow-xs shadow-gray-200 rounded"
            />
            <button
              onClick={handleUpdate}
              className="px-2 py-1 bg-green-500 cursor-pointer text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTask(null)}
              className="px-2 py-1 bg-gray-400  cursor-pointer text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            key={task._id}
            className={`flex shadow-xs ${task.expire&&"bg-red-400"} shadow-green-700 justify-between items-center p-3 rounded-lg`}
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
                disabled={task.expire}
                className="px-2 py-1 bg-blue-500  cursor-pointer text-white rounded disabled:bg-gray-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 py-1 bg-red-500  cursor-pointer text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
      {isError && <p>{(error as Error).message}</p>}
    </div>
  );
}

export default Body;
