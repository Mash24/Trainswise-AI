"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReviewsPage;
const react_1 = require("react");
const protected_route_1 = require("@/components/auth/protected-route");
const review_item_1 = require("@/components/reviews/review-item");
const api_client_1 = require("@/lib/api-client");
function ReviewsPage() {
    const [reviews, setReviews] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        const fetchReviews = async () => {
            try {
                const response = await api_client_1.apiClient.get('/reviews');
                setReviews(response.data);
            }
            catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch reviews');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, []);
    return (<protected_route_1.ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            View feedback and ratings for your completed tasks
          </p>
        </div>

        {error && (<div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>)}

        {isLoading ? (<div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>) : (<div className="space-y-4">
            {reviews.map((review) => (<review_item_1.ReviewItem key={review.id} {...review}/>))}
          </div>)}
      </div>
    </protected_route_1.ProtectedRoute>);
}
