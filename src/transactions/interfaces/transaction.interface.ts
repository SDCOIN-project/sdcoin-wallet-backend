export interface ITransaction {
  readonly block_number: number;
  readonly from: string;
  readonly to: string;
  readonly value: string;
  readonly hash: string;
  readonly gas: number;
  readonly gas_price: string;
  readonly internal: boolean;
  readonly utc: string;
  toJSON();
}
