import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { PostgresModule } from './postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesEntity } from './postgres/entities/currencies.entity';
import { TelegramUsers } from './postgres/entities/telegram_users.entity';
import { CategoriesEntity } from './postgres/entities/categories.entity';
import { CostsEntity } from './postgres/entities/costs.entity';
import { BudgetsEntity } from './postgres/entities/budgets.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BotModule,
    CurrenciesModule,
    PostgresModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_LOGIN,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_MAIN,
      entities: [
        CurrenciesEntity,
        TelegramUsers,
        CategoriesEntity,
        CostsEntity,
        BudgetsEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
