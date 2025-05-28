"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = exports.redisConfig = exports.databaseConfig = exports.authConfig = exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
}));
exports.authConfig = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '7', 10), // days
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
}));
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    url: process.env.DATABASE_URL,
}));
exports.redisConfig = (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
}));
exports.rateLimitConfig = (0, config_1.registerAs)('rateLimit', () => ({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // limit each IP to 100 requests per windowMs
}));
