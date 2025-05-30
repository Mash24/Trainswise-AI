import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reviewer {
  id: string;
  name: string;
  avatar?: string;
}

interface ReviewItemProps {
  review: {
    id: string;
    taskId: string;
    taskTitle: string;
    rating: number;
    comment: string;
    createdAt: string;
    reviewer: Reviewer;
  };
  className?: string;
}

export function ReviewItem({ review, className }: ReviewItemProps) {
  const { taskTitle, rating, comment, createdAt, reviewer } = review;

  return (
    <div
      data-testid="review-item"
      className={cn(
        'rounded-lg border bg-card p-6 transition-colors hover:bg-accent/50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{taskTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">by {reviewer.name}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              data-testid={i < rating ? 'star-filled' : 'star-empty'}
              className={cn(
                'h-4 w-4',
                i < rating
                  ? 'fill-primary text-primary'
                  : 'fill-muted text-muted'
              )}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm">{comment}</p>

      <div className="mt-4 text-sm text-muted-foreground">
        {new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    </div>
  );
} 