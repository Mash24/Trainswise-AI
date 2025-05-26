import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SettingsPage from '../page';
import { apiClient } from '@/lib/api-client';

// Mock the apiClient
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

// Mock the ProtectedRoute component
jest.mock('@/components/auth/protected-route', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('SettingsPage', () => {
  const mockProfile = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    bio: 'Test bio',
    skills: ['skill1', 'skill2'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (apiClient.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<SettingsPage />);
    // Check for spinner by class
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders profile data when loaded', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockProfile });
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    });
  });

  it('handles profile update', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockProfile });
    (apiClient.put as jest.Mock).mockResolvedValue({ data: { ...mockProfile, name: 'Updated Name' } });
    
    render(<SettingsPage />);

    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name');
      fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
      
      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(apiClient.put).toHaveBeenCalledWith('/users/me', {
        ...mockProfile,
        name: 'Updated Name',
      });
    });
  });

  it('shows error message when API call fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue({ response: { data: { message: 'Failed to fetch profile' } } });
    render(<SettingsPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch profile')).toBeInTheDocument();
    });
  });
}); 