import { Injectable } from '@nestjs/common';
import EscrowAbi from './abi/escrow.abi';
// tslint:disable-next-line:no-var-requires
const Web3 = require('web3');

@Injectable()
export class Web3Service {

  private readonly web3;

  constructor() {
    this.web3 = new Web3();
  }

  encodePaymentABI(escrowAddress: string, from: string, sig: string) {
    const contract = new this.web3.eth.Contract(EscrowAbi, escrowAddress);
    return contract.methods.payment(from, this.web3.utils.hexToBytes(sig)).encodeABI();
  }

  get utils() {
    return this.web3.utils;
  }

}
