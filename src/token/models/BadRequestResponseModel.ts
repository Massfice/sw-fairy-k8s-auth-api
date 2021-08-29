import { ApiProperty } from '@nestjs/swagger';
import { Http as httpStatus } from '@status/codes';

export class BadRequestResponseModel {
    @ApiProperty({ example: httpStatus.BadRequest })
    statusCode: number;

    @ApiProperty({ example: ['Code should be provided'] })
    message: string[];

    @ApiProperty({ example: 'Bad Request' })
    error: string;
}
