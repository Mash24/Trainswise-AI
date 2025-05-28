import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    role?: UserRole;
}
