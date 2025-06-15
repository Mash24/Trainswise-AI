import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTasks } from '@/hooks/useTasks';

interface TaskSubmissionFormProps {
  taskId: string;
  onSuccess?: () => void;
}

export function TaskSubmissionForm({ taskId, onSuccess }: TaskSubmissionFormProps) {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { submitTask } = useTasks();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await submitTask(taskId, { content, attachments });
      setSuccess(true);
      setContent('');
      setAttachments([]);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to submit task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">Submission successful!</div>}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">Submission Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
          placeholder="Describe your work or paste your answer here..."
        />
      </div>
      <div>
        <label htmlFor="attachments" className="block text-sm font-medium mb-1">Attachments (optional)</label>
        <Input
          id="attachments"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Submitting...' : 'Submit Task'}
      </Button>
    </form>
  );
} 