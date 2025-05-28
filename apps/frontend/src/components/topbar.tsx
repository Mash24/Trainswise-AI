'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">AI Training Jobs</h1>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-muted-foreground">
              {user.name || user.email}
            </span>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="ghost" asChild>
            <a href="/login">Login</a>
          </Button>
        )}
      </div>
    </div>
  );
} 