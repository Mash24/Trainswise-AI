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
exports.TaskPriority = exports.TaskDifficulty = exports.TaskType = void 0;
__exportStar(require("./auth.types"), exports);
var TaskType;
(function (TaskType) {
    TaskType["DEVELOPMENT"] = "DEVELOPMENT";
    TaskType["DESIGN"] = "DESIGN";
    TaskType["WRITING"] = "WRITING";
    TaskType["RESEARCH"] = "RESEARCH";
    TaskType["OTHER"] = "OTHER";
})(TaskType || (exports.TaskType = TaskType = {}));
var TaskDifficulty;
(function (TaskDifficulty) {
    TaskDifficulty["EASY"] = "EASY";
    TaskDifficulty["MEDIUM"] = "MEDIUM";
    TaskDifficulty["HARD"] = "HARD";
})(TaskDifficulty || (exports.TaskDifficulty = TaskDifficulty = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "LOW";
    TaskPriority["MEDIUM"] = "MEDIUM";
    TaskPriority["HIGH"] = "HIGH";
    TaskPriority["URGENT"] = "URGENT";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
