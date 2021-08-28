import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseModel {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string[];

    @ApiProperty()
    error: string;
}
