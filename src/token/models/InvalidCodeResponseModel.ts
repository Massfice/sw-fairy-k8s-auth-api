import { ApiProperty } from '@nestjs/swagger';

export class InvalidCodeResponseModel {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}
