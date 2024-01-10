// reviews.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from '../schema/review.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async create(
    rating: number,
    reviewer: string,
    reviewee: string,
  ): Promise<Review> {
    const newReview = new this.reviewModel({ rating, reviewer, reviewee });
    return newReview.save();
  }

  async getAverageRating(): Promise<number> {
    const reviews = await this.reviewModel.find().exec();
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    return sum / reviews.length;
  }

  async getReceivedReviewsAverageRating(username: string): Promise<number> {
    const reviews = await this.reviewModel.find({ reviewee: username }).exec();
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    return sum / reviews.length;
  }

  async getSentReviewsAverageRating(username: string): Promise<number> {
    const reviews = await this.reviewModel.find({ reviewer: username }).exec();
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    return sum / reviews.length;
  }

  async getUserReviewsStatistics(username: string): Promise<object> {
    const receivedAverage =
      await this.getReceivedReviewsAverageRating(username);
    const sentAverage = await this.getSentReviewsAverageRating(username);

    return {
      receivedAverageRating: receivedAverage,
      sentAverageRating: sentAverage,
    };
  }
}
