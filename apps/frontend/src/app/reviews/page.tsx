'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { ReviewItem } from '@/components/reviews/review-item';
import { apiClient } from '@/lib/api-client';

interface Review {
  id: string;
  taskTitle: string;
  rating: number;
  comment: string;
  reviewer: string;
  date: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiClient.get('/reviews');
        setReviews(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            View feedback and ratings for your completed tasks
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 