"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const prisma_service_1 = require("./prisma.service");
describe('PrismaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [prisma_service_1.PrismaService],
        }).compile();
        service = module.get(prisma_service_1.PrismaService);
    });
    afterEach(async () => {
        await service.$disconnect();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should connect to the database', async () => {
        await expect(service.$connect()).resolves.not.toThrow();
    });
    it('should disconnect from the database', async () => {
        await service.$connect();
        await expect(service.$disconnect()).resolves.not.toThrow();
    });
});
