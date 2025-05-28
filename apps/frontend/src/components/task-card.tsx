import { Task } from '@/hooks/useTasks';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface TaskCardProps {
  task: Task;
}

const difficultyColors = {
  EASY: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HARD: 'bg-red-100 text-red-800',
};

const statusColors = {
  OPEN: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  REVIEWED: 'bg-gray-100 text-gray-800',
};

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold line-clamp-2">
            {task.title}
          </CardTitle>
          <Badge className={difficultyColors[task.difficulty]}>
            {task.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3 mb-4">{task.description}</p>
        <div className="flex justify-between items-center">
          <Badge className={statusColors[task.status]}>
            {task.status.replace('_', ' ')}
          </Badge>
          <span className="text-lg font-semibold text-primary">
            ${task.reward.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          View Details
        </Button>
        {task.status === 'OPEN' && (
          <Button
            onClick={() => router.push(`/tasks/${task.id}/submit`)}
          >
            Start Task
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 