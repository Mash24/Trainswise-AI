import { PrismaService } from '@nexusloop/db';
export declare class TaskReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNotification(submission: any, review: any): Promise<void>;
    createDisputeNotification(submission: any, review: any): Promise<void>;
    createTestNotification(submission: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        message: string;
        title: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        read: boolean;
    }>;
}
