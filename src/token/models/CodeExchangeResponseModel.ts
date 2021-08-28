import { ApiProperty } from '@nestjs/swagger';

export class CodeExchangeResponseModel {
    @ApiProperty()
    access_token: string;
}
