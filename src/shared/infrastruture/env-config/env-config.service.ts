import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvConfig } from './env-config'

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('APP_PORT')) || 3000
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development'
  }
}
