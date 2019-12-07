export interface IEscrowContract {
  readonly methods: {
    payment(address: string, bytes: string);
  };
}
