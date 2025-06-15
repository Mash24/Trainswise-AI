'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/apiClient';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ activeTasks: 0, completedTasks: 0, earnings: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, activityResponse] = await Promise.all([
          apiClient.get('/dashboard/stats'),
          apiClient.get('/dashboard/recent-activity')
        ]);
        setStats(statsResponse);
        setRecentActivity(activityResponse);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/4"></div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="bg-card rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold">{stats.activeTasks}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold">{stats.completedTasks}</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Earnings</h3>
          <p className="text-3xl font-bold">${stats.earnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card rounded-lg shadow-sm p-6">
          {recentActivity.length > 0 ? (
            <ul className="space-y-2">
              {recentActivity.map((activity, index) => (
                <li key={index} className="text-muted-foreground">{activity.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
} 