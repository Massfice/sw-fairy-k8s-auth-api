import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @Get('/exchange')
    exchangeToken() {
        return { token: 'Exchanged with Dapr' };
    }
}
