import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEthAddress } from '../validators/eth.address.validator';

export class AccountAddressDto {
  @ApiModelProperty({
    required: true,
  })
  @IsString()
  @IsEthAddress({
    message: 'Should be Ethereum address',
  })
  address: string;
}
