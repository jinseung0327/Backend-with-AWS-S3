// reviews.controller.ts

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@ApiBearerAuth()
@ApiSecurity('basic')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CreateReviewDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '리뷰작성' })
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(
      createReviewDto.rating,
      createReviewDto.reviewer,
      createReviewDto.reviewee,
    );
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CreateReviewDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '리뷰불러오기' })
  @Get('average-rating')
  async getAverageRating() {
    return this.reviewsService.getAverageRating();
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CreateReviewDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '사용자 리뷰 불러오기' })
  @Get('user-statistics/:username')
  async getUserStatistics(@Param('username') username: string) {
    return this.reviewsService.getUserReviewsStatistics(username);
  }
}
