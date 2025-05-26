import { render, screen, waitFor } from '@testing-library/react';
import TasksPage from '../page';
import { apiClient } from '@/lib/api-client';

// Mock the apiClient
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

// Mock the ProtectedRoute component
jest.mock('@/components/auth/protected-route', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('TasksPage', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      reward: 100,
      deadline: new Date('2024-12-31').toISOString(),
      status: 'OPEN',
      tags: ['tag1', 'tag2'],
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      reward: 200,
      deadline: new Date('2024-12-31').toISOString(),
      status: 'IN_PROGRESS',
      tags: ['tag3'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (apiClient.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<TasksPage />);
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders tasks when data is loaded', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockTasks });
    render(<TasksPage />);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue({ response: { data: { message: 'Error loading tasks' } } });
    render(<TasksPage />);

    await waitFor(() => {
      expect(screen.getByText('Error loading tasks')).toBeInTheDocument();
    });
  });
}); 