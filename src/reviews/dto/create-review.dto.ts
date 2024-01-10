import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    required: true,
    example: 'test',
    description: '사용자',
  })
  @IsString()
  @IsNotEmpty()
  reviewer: string; // 리뷰를 작성한 사용자

  @ApiProperty({
    required: true,
    example: 'test2',
    description: '사용자',
  })
  @IsString()
  @IsNotEmpty()
  reviewee: string; // 리뷰를 받은 사용자
}
