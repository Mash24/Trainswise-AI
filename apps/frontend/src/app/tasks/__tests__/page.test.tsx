import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import Page from '../../(authenticated)/tasks/page';
import { apiClient } from '@/lib/apiClient';

// Mock the apiClient
jest.mock('@/lib/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

// Mock the ProtectedRoute component
jest.mock('@/components/auth/protected-route', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    status: 'completed',
  },
];

// Mock auth context
const mockAuthContext = {
  user: {
    id: '1',
    email: 'test@example.com',
    role: 'user',
    profile: {
      firstName: 'Test',
      lastName: 'User',
    },
  },
  login: jest.fn(),
  logout: jest.fn(),
  isLoading: false,
};

describe('TasksPage', () => {
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

  it('renders tasks when data is loaded', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue(mockTasks);
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch tasks. Please try again later.'));
    render(
      <AuthProvider>
        <Page />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch tasks. Please try again later.')).toBeInTheDocument();
    });
  });
}); 