import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  reviewer: string; // 리뷰를 작성한 사용자

  @Prop({ required: true })
  reviewee: string; // 리뷰를 받은 사용자
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
