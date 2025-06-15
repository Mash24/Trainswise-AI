import { Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4" role="banner">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
        <button 
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <div 
          className="h-8 w-8 rounded-full bg-primary"
          data-testid="profile-avatar"
          role="img"
          aria-label="Profile avatar"
        />
      </div>
    </header>
  );
} 