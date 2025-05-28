import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWithdrawalRequestDto } from './dto/create-withdrawal-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/guards/jwt-auth.guard';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  getBalance(@Req() req: RequestWithUser) {
    return this.walletService.getBalance(req.user.id);
  }

  @Get('transactions')
  getTransactions(@Req() req: RequestWithUser) {
    return this.walletService.getTransactions(req.user.id);
  }

  @Post('withdraw')
  createWithdrawalRequest(@Req() req: RequestWithUser, @Body() createWithdrawalRequestDto: CreateWithdrawalRequestDto) {
    return this.walletService.createWithdrawalRequest(req.user.id, createWithdrawalRequestDto);
  }
} 