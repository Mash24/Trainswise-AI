import { render, screen } from '@testing-library/react';
import { ReviewItem } from '../review-item';

describe('ReviewItem', () => {
  const mockReview = {
    id: '1',
    taskTitle: 'Test Task',
    rating: 4,
    comment: 'Great work!',
    reviewer: 'John Doe',
    date: '2024-01-01T00:00:00.000Z',
  };

  it('renders review information correctly', () => {
    render(<ReviewItem {...mockReview} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('by John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great work!')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2024')).toBeInTheDocument();
  });

  it('displays correct number of filled stars', () => {
    render(<ReviewItem {...mockReview} />);
    
    const filledStars = screen.getAllByTestId('star-filled');
    expect(filledStars).toHaveLength(4);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-review';
    render(<ReviewItem {...mockReview} className={customClass} />);
    
    const reviewElement = screen.getByTestId('review-item');
    expect(reviewElement).toHaveClass(customClass);
  });
}); 