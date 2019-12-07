import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { IEscrowContract } from './interfaces/escrow.contract';
import { Web3Service } from './web3.service';
import { CryptoApiService } from '../crypto.api/crypto.api.service';
import { Transaction } from 'ethereumjs-tx';

@Injectable()
export class TransactionService {

  private escrowContract: IEscrowContract;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly configService: ConfigService,
    private readonly cryptoApiService: CryptoApiService) {
  }

  async proxyTransaction(address: string, escrow: string, sig: string) {
    const privateKey = Buffer.from(this.configService.get().ETHEREUM.PRIV_KEY, 'hex');
    const sender = this.configService.get().ETHEREUM.SENDER;
    // TODO We should ches if this contract is real our escrow contract
    const data = this.web3Service.encodePaymentABI(escrow, address, sig);
    const { estimate_gas, gas_price, nonce } = await this.cryptoApiService.client.api.eth.estimateGas({
      to: escrow,
      value: '0',
      data,
      from: sender,
    });

    const txParams = {
      gasLimit: this.web3Service.utils.toHex(estimate_gas),
      nonce,
      gasPrice: this.web3Service.utils.toHex(gas_price),
      to: escrow,
      value: '0x00',
      data,
    };
    const tx = new Transaction(txParams, { chain: this.configService.get().ETHEREUM.NETWORK });
    tx.sign(privateKey);
    const serializedTx = tx.serialize().toString('hex');
    await this.cryptoApiService.client.api.eth.sendRawTransaction(`0x${serializedTx}`);
  }

}
