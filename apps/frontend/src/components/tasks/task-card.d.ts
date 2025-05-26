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
export declare function TaskCard({ title, description, reward, deadline, status, tags }: TaskCardProps): React.JSX.Element;
