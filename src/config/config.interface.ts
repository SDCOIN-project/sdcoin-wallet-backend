export interface ConfigInterface {
  readonly MONGODB_URI: string;
  readonly MONGODB_DATABASE: string;
  readonly CORS: boolean;
  readonly WS_PORT: number;
  readonly CRYPTO_API: {
    readonly TOKEN: string;
    readonly URL: string;
    readonly WS: string;
  };
  readonly CONTRACTS: {
    SDC: string;
    LUV: string;
  };
  readonly ETHEREUM: {
    readonly SENDER: string;
    readonly PRIV_KEY: string;
    readonly NETWORK: string;
    readonly INFURA_URL: string;
  };
}
