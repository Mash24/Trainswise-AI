import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
export declare class HealthController {
    private health;
    private prisma;
    private prismaService;
    constructor(health: HealthCheckService, prisma: PrismaHealthIndicator, prismaService: PrismaService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
