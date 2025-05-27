import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { Topbar } from '../topbar';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('Topbar', () => {
  const renderTopbar = () => {
    return render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <Topbar />
      </ThemeProvider>
    );
  };

  it('renders the dashboard title', () => {
    renderTopbar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders theme toggle button with correct aria label', () => {
    renderTopbar();
    const themeButton = screen.getByRole('button', { name: /switch to dark theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it('renders notification button with correct aria label', () => {
    renderTopbar();
    const notificationButton = screen.getByRole('button', { name: /view notifications/i });
    expect(notificationButton).toBeInTheDocument();
  });

  it('renders profile avatar with correct attributes', () => {
    renderTopbar();
    const profileAvatar = screen.getByRole('img', { name: /profile avatar/i });
    expect(profileAvatar).toBeInTheDocument();
    expect(profileAvatar).toHaveAttribute('data-testid', 'profile-avatar');
  });

  it('toggles theme when theme button is clicked', () => {
    const mockSetTheme = jest.fn();
    jest.spyOn(require('next-themes'), 'useTheme').mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
    }));

    renderTopbar();
    const themeButton = screen.getByRole('button', { name: /switch to dark theme/i });
    fireEvent.click(themeButton);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('renders with correct semantic HTML structure', () => {
    renderTopbar();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 