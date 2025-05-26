interface ReviewItemProps {
    id: string;
    taskTitle: string;
    rating: number;
    comment: string;
    reviewer: string;
    date: string;
    className?: string;
}
export declare function ReviewItem({ id, taskTitle, rating, comment, reviewer, date, className, }: ReviewItemProps): import("react").JSX.Element;
export {};
