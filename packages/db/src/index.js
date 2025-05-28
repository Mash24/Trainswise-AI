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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriority = exports.TaskDifficulty = exports.TaskType = exports.prisma = exports.PrismaService = void 0;
const client_1 = require("@prisma/client");
const types_1 = require("@nexusloop/types");
Object.defineProperty(exports, "TaskType", { enumerable: true, get: function () { return types_1.TaskType; } });
Object.defineProperty(exports, "TaskDifficulty", { enumerable: true, get: function () { return types_1.TaskDifficulty; } });
Object.defineProperty(exports, "TaskPriority", { enumerable: true, get: function () { return types_1.TaskPriority; } });
const prisma_service_1 = require("./prisma.service");
Object.defineProperty(exports, "PrismaService", { enumerable: true, get: function () { return prisma_service_1.PrismaService; } });
__exportStar(require("@prisma/client"), exports);
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
