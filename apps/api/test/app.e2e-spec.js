"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
const terminus_1 = require("@nestjs/terminus");
const prisma_service_1 = require("../src/prisma/prisma.service");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(async () => {
        try {
            const moduleFixture = await testing_1.Test.createTestingModule({
                imports: [app_module_1.AppModule],
            })
                .overrideProvider(terminus_1.HealthCheckService)
                .useValue({
                check: jest.fn().mockResolvedValue({
                    status: 'ok',
                    info: {
                        database: { status: 'up' },
                        redis: { status: 'up' },
                    },
                    error: {},
                    details: {
                        database: { status: 'up' },
                        redis: { status: 'up' },
                    },
                }),
            })
                .overrideProvider(prisma_service_1.PrismaService)
                .useValue({
                $connect: jest.fn(),
                $disconnect: jest.fn(),
                onModuleInit: jest.fn(),
                onModuleDestroy: jest.fn(),
            })
                .compile();
            app = moduleFixture.createNestApplication();
            await app.init();
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error('Error in beforeEach:', err);
            throw err;
        }
    });
    afterEach(async () => {
        if (app) {
            await app.close();
        }
    });
    it('/health (GET)', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect({
            status: 'ok',
            info: {
                database: { status: 'up' },
                redis: { status: 'up' },
            },
            error: {},
            details: {
                database: { status: 'up' },
                redis: { status: 'up' },
            },
        });
    });
});
