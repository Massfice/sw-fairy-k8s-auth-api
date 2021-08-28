import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodeExchangeRequestDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Code should be provided' })
    code: string;
}
