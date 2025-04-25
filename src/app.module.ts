import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './shared/infrastruture/env-config/env-config.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EnvConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
