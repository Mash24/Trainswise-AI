"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    // Create admin user
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: await bcrypt.hash('admin123', 10),
            role: client_1.UserRole.ADMIN,
            profile: {
                create: {
                    bio: 'System administrator',
                    skills: ['Management', 'System Administration'],
                },
            },
        },
    });
    // Create worker user
    const workerUser = await prisma.user.create({
        data: {
            email: 'worker@example.com',
            name: 'Worker User',
            password: await bcrypt.hash('worker123', 10),
            role: client_1.UserRole.WORKER,
            profile: {
                create: {
                    bio: 'Professional worker',
                    skills: ['Data Entry', 'Quality Assurance'],
                },
            },
        },
    });
    // Create client user
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@example.com',
            name: 'Client User',
            password: await bcrypt.hash('client123', 10),
            role: client_1.UserRole.CLIENT,
            profile: {
                create: {
                    bio: 'Task client',
                    skills: ['Project Management', 'Task Creation'],
                },
            },
        },
    });
    // Create tasks
    const tasks = await Promise.all([
        prisma.task.create({
            data: {
                title: 'Image Annotation Task',
                description: 'Annotate images with bounding boxes',
                type: client_1.TaskType.IMAGE_ANNOTATION,
                status: client_1.TaskStatus.OPEN,
                difficulty: client_1.TaskDifficulty.MEDIUM,
                reward: 50.0,
                deadline: new Date('2024-12-31'),
                client: {
                    connect: {
                        id: adminUser.id,
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                title: 'Data Entry Task',
                description: 'Enter data from scanned documents',
                type: client_1.TaskType.DATA_ENTRY,
                status: client_1.TaskStatus.OPEN,
                difficulty: client_1.TaskDifficulty.EASY,
                reward: 30.0,
                deadline: new Date('2024-12-31'),
                client: {
                    connect: {
                        id: adminUser.id,
                    },
                },
            },
        }),
        prisma.task.create({
            data: {
                title: 'Transcription Task',
                description: 'Transcribe audio recordings',
                type: client_1.TaskType.TRANSCRIPTION,
                status: client_1.TaskStatus.OPEN,
                difficulty: client_1.TaskDifficulty.HARD,
                reward: 100.0,
                deadline: new Date('2024-12-31'),
                client: {
                    connect: {
                        id: adminUser.id,
                    },
                },
            },
        }),
    ]);
    console.log('Seed data created successfully!');
    console.log('Created users:', { adminUser, workerUser, clientUser });
    console.log('Created tasks:', tasks);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
