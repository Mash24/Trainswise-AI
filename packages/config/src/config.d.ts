export declare const appConfig: (() => {
    port: number;
    environment: "development" | "production" | "test";
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    environment: "development" | "production" | "test";
}>;
export declare const authConfig: (() => {
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: number;
    bcryptSaltRounds: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: number;
    bcryptSaltRounds: number;
}>;
export declare const databaseConfig: (() => {
    url: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    url: string | undefined;
}>;
export declare const redisConfig: (() => {
    host: string;
    port: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
}>;
export declare const rateLimitConfig: (() => {
    windowMs: number;
    max: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    windowMs: number;
    max: number;
}>;
