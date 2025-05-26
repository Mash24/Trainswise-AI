"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewItem = ReviewItem;
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function ReviewItem({ id, taskTitle, rating, comment, reviewer, date, className, }) {
    return (<div data-testid="review-item" className={(0, utils_1.cn)('rounded-lg border bg-card p-6 transition-colors hover:bg-accent/50', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{taskTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">by {reviewer}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (<lucide_react_1.Star key={i} data-testid={i < rating ? 'star-filled' : 'star-empty'} className={(0, utils_1.cn)('h-4 w-4', i < rating
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted')}/>))}
        </div>
      </div>

      <p className="mt-4 text-sm">{comment}</p>

      <div className="mt-4 text-sm text-muted-foreground">
        {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })}
      </div>
    </div>);
}
