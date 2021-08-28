import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodeExchangeRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    code: string;
}