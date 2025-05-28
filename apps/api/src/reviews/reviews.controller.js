"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const create_review_dto_1 = require("./dto/create-review.dto");
const dispute_review_dto_1 = require("./dto/dispute-review.dto");
const swagger_1 = require("@nestjs/swagger");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(dto, req) {
        // reviewerId comes from token
        return this.reviewsService.createReview({ ...dto, reviewerId: req.user.id });
    }
    getByTask(taskId) {
        return this.reviewsService.getReviewByTask(taskId);
    }
    getBySubmission(submissionId) {
        return this.reviewsService.getReviewBySubmission(submissionId);
    }
    dispute(id, dto, req) {
        return this.reviewsService.disputeReview(id, dto.reason, req.user.id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The review has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Submission not found.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':taskId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a review by task id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the review.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No review for this task.' }),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getByTask", null);
__decorate([
    (0, common_1.Get)('submission/:submissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a review by submission id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the review.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No review for this submission.' }),
    __param(0, (0, common_1.Param)('submissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getBySubmission", null);
__decorate([
    (0, common_1.Post)(':id/dispute'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CLIENT, client_1.UserRole.WORKER),
    (0, swagger_1.ApiOperation)({ summary: 'Dispute a review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The review has been successfully disputed.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dispute_review_dto_1.DisputeReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "dispute", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
