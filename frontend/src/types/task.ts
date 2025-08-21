export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'done';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status?: 'pending' | 'done';
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'pending' | 'done';
}