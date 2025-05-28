export declare const databaseConfig: (() => {
    url: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string | undefined;
}>;
export declare const redisConfig: (() => {
    host: string;
    port: number;
    password: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    password: string | undefined;
}>;
export declare const jwtConfig: (() => {
    secret: string | undefined;
    expiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string | undefined;
    expiresIn: string;
}>;
export declare const appConfig: (() => {
    port: number;
    apiPrefix: string;
    apiVersion: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    apiPrefix: string;
    apiVersion: string;
}>;
export declare const authConfig: (() => {
    jwtSecret: string | undefined;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string | undefined;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: string;
}>;
export declare const rateLimitConfig: (() => {
    windowMs: number;
    max: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    windowMs: number;
    max: number;
}>;
