import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Topbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        <button className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-primary"></div>
      </div>
    </div>
  );
} 