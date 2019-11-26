import { ApiModelProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, Max, Min, IsEnum } from 'class-validator';
import { CURRENCY_TYPE } from '../transactions.constants';

export class GetTransactionsDto {
  @ApiModelProperty({
    default: 0,
  })
  @Transform(parseInt)
  @IsInt()
  @Min(0)
  offset: number = 0;

  @ApiModelProperty({
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  count: number = 10;

  @ApiModelProperty({
    required: true,
    enum: Object.values(CURRENCY_TYPE),
  })
  @IsString()
  @IsEnum(Object.values(CURRENCY_TYPE))
  currencyType: string = CURRENCY_TYPE.ETH;
}
