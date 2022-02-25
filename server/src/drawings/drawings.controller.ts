import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { FindOneParams } from 'src/utils/findOneParams';
import { DrawingsService } from './drawings.service';
import CreateDrawingDto from './dto/createDrawing.dto';
import UpdateDrawingDto from './dto/updateDrawing.dto';

// TODO сделать роутер с получением рисунокв конкретного пользователя
@Controller('drawings')
@UseGuards(JwtAuthenticationGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Get()
  getAllDrawings() {
    return this.drawingsService.getAllDrawings();
  }

  @Get('sorted')
  getSortedDrawings() {
    return this.drawingsService.getSortedDrawings();
  }

  @Post()
  async createDrawing(
    @Body() drawing: CreateDrawingDto,
    @Req() req: RequestWithUser,
  ) {
    return this.drawingsService.createDrawing(drawing, req.user);
  }

  @Patch(':id/publish')
  async publishDrawing(
    @Param() { id }: FindOneParams,
    @Body() drawing: UpdateDrawingDto,
    @Req() req: RequestWithUser,
  ) {
    return this.drawingsService.publishDrawing(Number(id), drawing, req.user);
  }

  @Patch(':id/like')
  async updateDrawing(
    @Param() { id }: FindOneParams,
    @Req() req: RequestWithUser,
  ) {
    return this.drawingsService.likeDrawing(Number(id), req.user);
  }

  @Delete(':id')
  async deleteDrawing(
    @Param() { id }: FindOneParams,
    @Req() req: RequestWithUser,
  ) {
    return this.drawingsService.deleteDrawing(Number(id), req.user);
  }
}
