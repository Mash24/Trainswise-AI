'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stats Cards */}
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Earnings</h3>
          <p className="text-3xl font-bold">$0.00</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card rounded-lg shadow-sm p-6">
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      </div>
    </div>
  );
} 