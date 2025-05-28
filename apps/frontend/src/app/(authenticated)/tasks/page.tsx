'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function TasksPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex gap-4">
          <select className="bg-card border rounded-md px-3 py-2">
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <p className="text-muted-foreground">No tasks available</p>
        </div>
      </div>
    </div>
  );
} 