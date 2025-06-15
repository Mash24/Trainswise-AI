import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TasksPage from './TasksPage';
import { apiClient } from '../api/client';

// Mock the useAuth hook
jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock the API client
jest.mock('../api/client', () => ({
  apiClient: {
    getTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn()
  }
}));

describe('TasksPage', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  };

  const mockTasks = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Description 1',
      status: 'pending',
      assignedTo: '1',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Description 2',
      status: 'completed',
      assignedTo: '1',
      createdAt: '2024-01-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser
    });
    (apiClient.getTasks as jest.Mock).mockResolvedValue(mockTasks);
  });

  it('renders tasks list', async () => {
    render(
      <BrowserRouter>
        <TasksPage />
      </BrowserRouter>
    );

    // Initially shows loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
      expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    });
  });

  it('handles task creation', async () => {
    const newTask = {
      id: '3',
      title: 'New Task',
      description: 'New Description',
      status: 'pending',
      assignedTo: '1',
      createdAt: '2024-01-03T00:00:00Z'
    };

    (apiClient.createTask as jest.Mock).mockResolvedValue(newTask);

    render(
      <BrowserRouter>
        <TasksPage />
      </BrowserRouter>
    );

    // Wait for initial tasks to load
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    });

    // Click create task button
    fireEvent.click(screen.getByRole('button', { name: /create task/i }));

    // Fill in task form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Task' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Verify API call
    await waitFor(() => {
      expect(apiClient.createTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New Description',
        status: 'pending',
        assignedTo: '1'
      });
    });
  });
}); 