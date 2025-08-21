import axios from 'axios';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks
  getAllTasks: async (sort?: string): Promise<Task[]> => {
    const params = sort ? { sort } : {};
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get single task
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id: string, taskData: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;