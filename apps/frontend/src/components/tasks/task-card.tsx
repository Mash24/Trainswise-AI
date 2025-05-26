import React from 'react';

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
  tags: string[];
}

export function TaskCard({ title, description, reward, deadline, status, tags }: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs font-medium text-muted-foreground">{status.replace('_', ' ')}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded bg-muted px-2 py-0.5 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Reward: <span className="font-semibold">${reward}</span></span>
        <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
      </div>
    </div>
  );
} 