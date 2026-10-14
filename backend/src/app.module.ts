import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioModule } from './portfolio';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      synchronize: true, // creates tables automatically; fine for a portfolio
    }),
    PortfolioModule,
  ],
})
export class AppModule {}
