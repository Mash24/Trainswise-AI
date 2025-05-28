"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const review_item_1 = require("../review-item");
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
        (0, react_1.render)(<review_item_1.ReviewItem {...mockReview}/>);
        expect(react_1.screen.getByText('Test Task')).toBeInTheDocument();
        expect(react_1.screen.getByText('by John Doe')).toBeInTheDocument();
        expect(react_1.screen.getByText('Great work!')).toBeInTheDocument();
        expect(react_1.screen.getByText('Jan 1, 2024')).toBeInTheDocument();
    });
    it('displays correct number of filled stars', () => {
        (0, react_1.render)(<review_item_1.ReviewItem {...mockReview}/>);
        const filledStars = react_1.screen.getAllByTestId('star-filled');
        expect(filledStars).toHaveLength(4);
    });
    it('applies custom className when provided', () => {
        const customClass = 'custom-review';
        (0, react_1.render)(<review_item_1.ReviewItem {...mockReview} className={customClass}/>);
        const reviewElement = react_1.screen.getByTestId('review-item');
        expect(reviewElement).toHaveClass(customClass);
    });
});
