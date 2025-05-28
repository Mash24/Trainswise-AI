import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEWED';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  reward: number;
  assignedTo?: {
    id: string;
    email: string;
    profile?: {
      firstName?: string;
      lastName?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>;
  updateTask: (id: string, task: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  submitTask: (taskId: string, submission: { content: string; attachments?: File[] }) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get<Task[]>('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await apiClient.post<Task>('/tasks', task);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, task: Partial<Task>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await apiClient.patch<Task>(`/tasks/${id}`, task);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      return updatedTask;
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitTask = useCallback(async (taskId: string, submission: { content: string; attachments?: File[] }) => {
    try {
      setLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('content', submission.content);
      
      if (submission.attachments) {
        submission.attachments.forEach((file) => {
          formData.append('attachments', file);
        });
      }

      await apiClient.post(`/tasks/${taskId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh tasks to update status
      await fetchTasks();
    } catch (err) {
      setError('Failed to submit task');
      console.error('Error submitting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    submitTask,
  };
} 