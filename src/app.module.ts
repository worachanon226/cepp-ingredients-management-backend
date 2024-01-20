import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from 'config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { RestaurantService } from './modules/restaurant/restaurant.service';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/configuration`,
    }),
    MongooseModule.forRoot(databaseConfig().url),
    UserModule,
    AuthModule,
    MenuModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
