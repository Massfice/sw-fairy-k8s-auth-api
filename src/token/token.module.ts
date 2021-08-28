import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
    controllers: [TokenController],
    providers: [TokenService],
    imports: [HttpModule],
})
export class TokenModule {}
