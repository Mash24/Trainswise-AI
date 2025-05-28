import { PrismaService } from '../prisma/prisma.service';
export declare class HealthService {
    private prisma;
    constructor(prisma: PrismaService);
    isDatabaseHealthy(): Promise<boolean>;
}
