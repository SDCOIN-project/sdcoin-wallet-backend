import * as config from 'config';
import { ConfigInterface } from './config.interface';

export class ConfigService {
  private readonly config: ConfigInterface;

  constructor() {
    this.config = config;
  }

  get(): ConfigInterface {
    return this.config;
  }
}
