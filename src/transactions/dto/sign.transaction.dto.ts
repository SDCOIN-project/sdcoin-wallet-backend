import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignTransaction {
  @ApiModelProperty({
    default: '',
  })
  @IsString()
  from: string;

  @ApiModelProperty({
    default: '',
  })
  @IsString()
  escrow: string;

  @ApiModelProperty({
    default: '',
  })
  @IsString()
  sig: string;
}
