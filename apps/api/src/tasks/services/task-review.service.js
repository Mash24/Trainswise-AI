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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskReviewService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("@nexusloop/db");
let TaskReviewService = class TaskReviewService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNotification(submission, review) {
        await this.prisma.notification.create({
            data: {
                userId: submission.task.assignedToId || '',
                type: 'TASK_REVIEW',
                message: `Your task "${submission.task.title}" has been reviewed`,
                data: {
                    taskId: submission.taskId,
                    submissionId: submission.id,
                    reviewId: review.id,
                },
            },
        });
    }
    async createDisputeNotification(submission, review) {
        await this.prisma.notification.create({
            data: {
                userId: submission.task.assignedToId || '',
                type: 'TASK_REVIEW_DISPUTED',
                message: `Your review for task "${submission.task.title}" has been disputed`,
                data: {
                    taskId: submission.taskId,
                    submissionId: submission.id,
                    reviewId: review.id,
                },
            },
        });
    }
    async createTestNotification(submission) {
        const testNotification = await this.prisma.notification.create({
            data: {
                userId: submission.task.assignedToId || '',
                type: 'TEST',
                message: 'Test notification',
                data: {},
            },
        });
        return testNotification;
    }
};
exports.TaskReviewService = TaskReviewService;
exports.TaskReviewService = TaskReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_1.PrismaService])
], TaskReviewService);
