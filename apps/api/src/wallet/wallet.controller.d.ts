import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { Request as ExpressRequest } from 'express';
export declare class WalletController {
    getBalance(req: ExpressRequest): void;
    getTransactions(req: ExpressRequest): void;
    createWithdrawalRequest(dto: CreateWithdrawalRequestDto, req: ExpressRequest): void;
}
