'use client';

import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import AuthForm from '@/components/AuthForm';
import JsonLd from '@/components/JsonLd';
import { useAuth } from '@/context/AuthContext';
import { taskService } from '@/services/api';
import { Task, CreateTaskData } from '@/types/task';

export default function Home() {
  const { user, login, register, logout, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date');
  const [mounted, setMounted] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    setMounted(true);
    loadTasks();
  }, [sortBy]); // loadTasks is stable, safe to omit

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getAllTasks(sortBy);
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (taskData: CreateTaskData) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await taskService.updateTask(editingTask._id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? updatedTask : task
      ));
      setEditingTask(null);
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(prev => prev.filter(task => task._id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'done' ? 'pending' : 'done';
      const updatedTask = await taskService.updateTask(id, { status: newStatus });
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update task status');
      console.error('Error updating task status:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    done: tasks.filter(task => task.status === 'done').length,
  };

  const handleAuthSubmit = async (data: { name?: string; email: string; password: string }) => {
    const success = authMode === 'login' 
      ? await login(data.email, data.password)
      : await register(data.name, data.email, data.password);
    
    if (success) {
      loadTasks(); // Reload tasks after login
    } else {
      setError('Authentication failed. Please try again.');
    }
  };

  // If user is not logged in, show auth form
  if (!user) {
    return (
      <>
        <JsonLd />
        <AuthForm
          mode={authMode}
          onSubmit={handleAuthSubmit}
          onModeSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          loading={authLoading}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <JsonLd />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h2 className="text-lg font-semibold text-gray-800">Welcome, {user.name}!</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Manage your tasks efficiently</p>
          
          {mounted && (
            <div className="flex justify-center space-x-6 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{taskStats.pending}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{taskStats.done}</div>
                <div className="text-sm text-gray-500">Done</div>
              </div>
            </div>
          )}
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <TaskForm 
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialData={editingTask || undefined}
          submitLabel={editingTask ? 'Update Task' : 'Create Task'}
        />

        {editingTask && (
          <div className="mb-6">
            <button
              onClick={() => setEditingTask(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Filter by Status</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('done')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'done' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Done
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Sort by</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy('date')}
                className={`px-4 py-2 rounded-md ${
                  sortBy === 'date' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Date Created
              </button>
              <button
                onClick={() => setSortBy('title')}
                className={`px-4 py-2 rounded-md ${
                  sortBy === 'title' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Title A-Z
              </button>
              <button
                onClick={() => setSortBy('status')}
                className={`px-4 py-2 rounded-md ${
                  sortBy === 'status' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Status
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading tasks...</div>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onStatusToggle={handleStatusToggle}
          />
        )}
      </div>
    </div>
  );
}
