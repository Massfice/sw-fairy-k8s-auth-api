import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Http as httpStatus } from '@status/codes';
import { Observable } from 'rxjs';

import { CodeExchangeRequestDto } from './dto/CodeExchangeRequestDto';
import { BadRequestResponseModel } from './models/BadRequestResponseModel';
import { CodeExchangeResponseModel } from './models/CodeExchangeResponseModel';
import { InvalidCodeResponseModel } from './models/InvalidCodeResponseModel';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @ApiOperation({ description: 'Exchange code for token and user object', tags: ['Auth'] })
    @ApiResponse({
        description: 'Access token and user informations',
        type: CodeExchangeResponseModel,
        status: httpStatus.Ok,
    })
    @ApiResponse({
        description: 'Code was not provided',
        type: BadRequestResponseModel,
        status: httpStatus.BadRequest,
    })
    @ApiResponse({
        description: 'Invalid code',
        type: InvalidCodeResponseModel,
        status: httpStatus.Forbidden,
    })
    @Get('/codeExchange')
    codeExchange(@Query() query: CodeExchangeRequestDto): Observable<CodeExchangeResponseModel> {
        return this.tokenService.codeExchange(query.code);
    }
}
