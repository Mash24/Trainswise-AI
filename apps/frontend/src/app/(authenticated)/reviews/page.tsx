'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function ReviewsPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <div className="flex gap-4">
          <select className="bg-card border rounded-md px-3 py-2">
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <p className="text-muted-foreground">No reviews available</p>
        </div>
      </div>
    </div>
  );
} 