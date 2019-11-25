export interface ConfigInterface {
  readonly MONGODB_URI: string;
  readonly MONGODB_DATABASE: string;
  readonly AUTH_SECRET_KEY: string;
  readonly CORS: boolean;
}
