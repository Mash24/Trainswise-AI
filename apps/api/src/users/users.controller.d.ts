import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as ExpressRequest } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: ExpressRequest): Express.User | undefined;
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, req: ExpressRequest): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
