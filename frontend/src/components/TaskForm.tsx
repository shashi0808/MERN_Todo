'use client';

import { useState } from 'react';
import { CreateTaskData, Task } from '@/types/task';

interface TaskFormProps {
  onSubmit: (taskData: CreateTaskData) => void;
  initialData?: Task;
  submitLabel?: string;
}

export default function TaskForm({ onSubmit, initialData, submitLabel = 'Create Task' }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({ title: '', description: '', status: 'pending' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500 font-medium"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-bold text-gray-800 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white placeholder-gray-500 font-medium"
          rows={3}
          placeholder="Enter task description"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="status" className="block text-sm font-bold text-gray-800 mb-2">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'done' })}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white font-medium"
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {submitLabel}
      </button>
    </form>
  );
}