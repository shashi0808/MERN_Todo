'use client';

import { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string, currentStatus: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
            task.status === 'done' ? 'border-green-500 bg-green-50' : 'border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${
                task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              <p className={`text-gray-600 mb-3 ${
                task.status === 'done' ? 'line-through' : ''
              }`}>
                {task.description}
              </p>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'done' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status === 'done' ? 'Completed' : 'Pending'}
                </span>
                <span className="text-sm text-gray-500" suppressHydrationWarning>
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => onStatusToggle(task._id, task.status)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  task.status === 'done'
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {task.status === 'done' ? 'Mark Pending' : 'Mark Done'}
              </button>
              
              <button
                onClick={() => onEdit(task)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Edit
              </button>
              
              <button
                onClick={() => onDelete(task._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}