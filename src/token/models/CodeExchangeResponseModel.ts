import { ApiProperty } from '@nestjs/swagger';

class User {
    @ApiProperty()
    email: string;

    @ApiProperty()
    nick: string;
}

export class CodeExchangeResponseModel {
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    user: User;
}
