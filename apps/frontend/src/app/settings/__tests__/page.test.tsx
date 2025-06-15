import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import Page from '../../(authenticated)/settings/page';
import { apiClient } from '@/lib/apiClient';

// Mock the api client
jest.mock('@/lib/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

// Mock profile data
const mockProfile = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  bio: 'Test bio',
};

describe('SettingsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders profile data when loaded', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockProfile);
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument();
    });
  });

  it('handles profile update', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockProfile);
    (apiClient.put as jest.Mock).mockResolvedValue({ ...mockProfile, firstName: 'Updated' });
    
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Updated User' } });
    
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(apiClient.put).toHaveBeenCalledWith('/api/profile', {
        firstName: 'Updated',
        lastName: 'User',
        bio: 'Test bio',
      });
    });
  });

  it('shows error message when API call fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('Failed to load profile'));
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load profile')).toBeInTheDocument();
    });
  });
}); 