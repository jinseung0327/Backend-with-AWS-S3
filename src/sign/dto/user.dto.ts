import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    example: '홍길동',
    description: '아이디',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: 'qwer1234!',
    description: '비밀번호',
  })
  @IsString()
  readonly password: string;
}
