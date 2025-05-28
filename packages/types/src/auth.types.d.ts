export interface JwtPayload {
    email: string;
    sub: string;
    role: string;
}
export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
    };
}
export declare const AUTH_ERROR_MESSAGES: {
    readonly USER_NOT_FOUND: "User not found";
    readonly INVALID_CREDENTIALS: "Invalid credentials";
    readonly INVALID_REFRESH_TOKEN: "Invalid or expired refresh token";
    readonly EMAIL_EXISTS: "Email already exists";
};
