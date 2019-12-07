import {
  Controller,
  UsePipes,
  Post, Body,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { JoiValidationPipe } from '../pipes/joi.validation.pipe';
import { TransactionService } from './transactions.service';
import { SignTransaction } from './dto/sign.transaction.dto';
import { SignTransactionValidator } from './validators/sign.transaction.validator';

@ApiUseTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionService) {
  }

  @Post('proxy')
  @ApiOperation({
    title: 'Sign and send payment transaction',
  })
  @UsePipes(new JoiValidationPipe(SignTransactionValidator))
  async signTransaction(@Body() body: SignTransaction) {
    return this.transactionService.proxyTransaction(body.from, body.escrow, body.sig);
  }

}
