'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { TaskSubmissionForm } from '@/components/TaskSubmissionForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { API_CONFIG } from '@/config/api';

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiClient.get(API_CONFIG.endpoints.tasks.get(id));
        setTask(data);
      } catch (err) {
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }
  if (!task) {
    return <div className="p-8 text-center">Task not found.</div>;
  }

  const canSubmit =
    task.status === 'OPEN' && user && (!task.assignedTo || task.assignedTo.id === user.id);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge>{task.difficulty}</Badge>
            <Badge>{task.status}</Badge>
            <Badge>${task.reward.toFixed(2)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700 whitespace-pre-line">{task.description}</p>
          {canSubmit && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Submit your work</h2>
              <TaskSubmissionForm taskId={task.id} onSuccess={() => window.location.reload()} />
            </div>
          )}
          {!canSubmit && (
            <div className="mt-8 text-gray-500">You cannot submit for this task.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 