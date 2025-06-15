import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SettingsPage from './SettingsPage';
import { apiClient } from '../api/client';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock the API client
jest.mock('../api/client', () => ({
  apiClient: {
    getProfile: jest.fn(),
    updateProfile: jest.fn()
  }
}));

describe('SettingsPage', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  };

  const mockProfile = {
    id: '1',
    userId: '1',
    theme: 'light',
    notifications: true,
    language: 'en'
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser
    });
    (apiClient.getProfile as jest.Mock).mockResolvedValue(mockProfile);
  });

  it('renders settings form with profile data', async () => {
    render(
      <BrowserRouter>
        <SettingsPage />
      </BrowserRouter>
    );

    // Initially shows loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByLabelText(/theme/i)).toHaveValue('light');
      expect(screen.getByLabelText(/notifications/i)).toBeChecked();
      expect(screen.getByLabelText(/language/i)).toHaveValue('en');
    });
  });

  it('handles undefined profile gracefully', async () => {
    (apiClient.getProfile as jest.Mock).mockResolvedValue(null);

    render(
      <BrowserRouter>
        <SettingsPage />
      </BrowserRouter>
    );

    // Initially shows loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for form to render with default values
    await waitFor(() => {
      expect(screen.getByLabelText(/theme/i)).toHaveValue('light');
      expect(screen.getByLabelText(/notifications/i)).toBeChecked();
      expect(screen.getByLabelText(/language/i)).toHaveValue('en');
    });
  });

  it('updates profile settings', async () => {
    const updatedProfile = {
      ...mockProfile,
      theme: 'dark',
      notifications: false,
      language: 'es'
    };

    (apiClient.updateProfile as jest.Mock).mockResolvedValue(updatedProfile);

    render(
      <BrowserRouter>
        <SettingsPage />
      </BrowserRouter>
    );

    // Wait for initial profile to load
    await waitFor(() => {
      expect(screen.getByLabelText(/theme/i)).toBeInTheDocument();
    });

    // Update settings
    fireEvent.change(screen.getByLabelText(/theme/i), {
      target: { value: 'dark' }
    });
    fireEvent.click(screen.getByLabelText(/notifications/i));
    fireEvent.change(screen.getByLabelText(/language/i), {
      target: { value: 'es' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    // Verify API call
    await waitFor(() => {
      expect(apiClient.updateProfile).toHaveBeenCalledWith('1', {
        theme: 'dark',
        notifications: false,
        language: 'es'
      });
    });

    // Verify success message
    expect(screen.getByText(/settings updated/i)).toBeInTheDocument();
  });
}); 