import { ApiProperty } from '@nestjs/swagger';
import { Http as httpStatus } from '@status/codes';

export class InvalidCodeResponseModel {
    @ApiProperty({ example: httpStatus.Forbidden })
    statusCode: number;

    @ApiProperty({ example: 'Invalid code' })
    message: string;
}
