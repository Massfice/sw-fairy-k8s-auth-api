import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Http as httpStatus } from '@status/codes';

import { CodeExchangeRequestDto } from './dto/CodeExchangeRequestDto';
import { BadRequestResponseModel } from './models/BadRequestResponseModel';
import { CodeExchangeResponseModel } from './models/CodeExchangeResponseModel';
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
    @Get('/codeExchange')
    exchangeToken(@Query() query: CodeExchangeRequestDto): CodeExchangeResponseModel {
        return { access_token: query.code };
    }
}
