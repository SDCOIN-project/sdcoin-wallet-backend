import {
  Controller,
  Get,
  UsePipes,
  Query,
  Param,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JoiValidationPipe } from '../pipes/joi.validation.pipe';
import { GetTransactionsDto } from './dto/get.transactions.dto';
import { GetTransactionsValidator } from './validators/get.transactions.validator';
import { TransactionService } from './transactions.service';
import { AccountAddressDto } from './dto/account.address.dto';

@ApiUseTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionService: TransactionService) {
  }

  @Get(':address')
  @ApiOperation({
    title: 'Get transactions list',
    description: `returns all transactions for particular address`,
  })
  @ApiBearerAuth()
  @UsePipes(new JoiValidationPipe(GetTransactionsValidator))
  async getTransactions(@Param() param: AccountAddressDto, @Query() query: GetTransactionsDto) {
    return this.transactionService.getTransactions(query.offset, query.count, query.currencyType, param.address);
  }

}
