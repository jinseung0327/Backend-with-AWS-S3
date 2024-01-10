import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SignModule } from './sign/sign.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserService } from './user/user.service';
import { PostModule } from './post/post.module';
import { EventsModule } from './events/events.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-base'),
    SignModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWTSecretKey',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PostModule,
    EventsModule,
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentsModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
