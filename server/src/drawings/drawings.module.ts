import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Drawing from './drawing.entity';
import { DrawingsController } from './drawings.controller';
import { DrawingsService } from './drawings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing])],
  controllers: [DrawingsController],
  providers: [DrawingsService],
})
export class DrawingsModule {}
