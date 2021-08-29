import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenModule } from './token/token.module';

@Module({
    imports: [TokenModule, ConfigModule.forRoot()],
})
export class AppModule {}
