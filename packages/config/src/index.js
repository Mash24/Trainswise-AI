"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = exports.authConfig = exports.appConfig = exports.jwtConfig = exports.redisConfig = exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    url: process.env.DATABASE_URL,
}));
exports.redisConfig = (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
}));
exports.jwtConfig = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '1d',
}));
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
}));
exports.authConfig = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRATION || '1d',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
}));
exports.rateLimitConfig = (0, config_1.registerAs)('rateLimit', () => ({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // limit each IP to 100 requests per windowMs
}));
