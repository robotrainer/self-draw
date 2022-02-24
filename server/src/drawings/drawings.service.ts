import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import Drawing from './drawing.entity';
import CreateDrawingDto from './dto/createDrawing.dto';
import UpdateDrawingDto from './dto/updateDrawing.dto';
import DrawingNotFoundException from './exceptions/drawingfNotFound.exception';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectRepository(Drawing)
    private drawingRepository: Repository<Drawing>,
  ) {}

  // TODO сделать вызова с лимитом
  // * получить новые рисунки
  getAllDrawings() {
    return this.drawingRepository.find({
      where: {
        publication: true,
      },
      relations: ['author'],
      order: {
        createDate: 'DESC',
      },
    });
  }

  // TODO сделать взов с лимитом
  // * получить популярные рисунки за всё время
  getSortedDrawings() {
    return this.drawingRepository.find({
      where: {
        publication: true,
      },
      relations: ['author'],
      order: {
        likes: 'DESC',
      },
    });
  }
  // TODO при получении base64 конвертировать в png и сохранять или в файловую систему, или в облачное хранилище minIO
  // TODO убрать заглушку в drawing.entity c imgPath
  // * создать рисунок
  async createDrawing(drawing: CreateDrawingDto, user: User) {
    const buffer = Buffer.from(drawing.imgBase64, 'base64');
    const timestamp = Date.now().toString();
    const hashedDrawingName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const dirUser = `./public/${user.login}`;

    if (!fs.existsSync(dirUser)) {
      fs.mkdirSync(dirUser, { recursive: true });
    }

    const url = `${process.env.API_URL}/public/${user.login}/${hashedDrawingName}.jpg`;

    fs.writeFileSync(`${dirUser}/${hashedDrawingName}.jpg`, buffer);
    const newDrawing = await this.drawingRepository.create({
      ...drawing,
      url: url,
      author: user,
    });

    await this.drawingRepository.save(newDrawing);
    return newDrawing;
  }

  // * лайкнуть или отменить лайк
  async likeDrawing(id: number, user: User) {
    const updateDrawing = await this.drawingRepository.findOne(id, {
      relations: ['author'],
    });

    if (!updateDrawing) {
      throw new DrawingNotFoundException(id);
    }

    const indexFoundLikedUser = updateDrawing.whoLikes.findIndex(
      (elem) => elem.login === user.login,
    );

    if (indexFoundLikedUser === -1) {
      updateDrawing.whoLikes.push(user);
      updateDrawing.likes++;
    } else {
      updateDrawing.whoLikes.splice(indexFoundLikedUser, 1);
      updateDrawing.likes--;
    }

    return this.saveUpdateDrawing(id, updateDrawing);
  }

  // * опубликовать или отменить публикацию
  async publishDrawing(id: number, drawing: UpdateDrawingDto, user: User) {
    const updateDrawing = await this.drawingRepository.findOne(id, {
      relations: ['author'],
    });

    if (!updateDrawing) {
      throw new DrawingNotFoundException(id);
    }

    if ('publication' in drawing && updateDrawing.author.login === user.login) {
      updateDrawing.publication = drawing.publication;
    } else {
      throw new ForbiddenException('Forbidden');
    }

    return this.saveUpdateDrawing(id, updateDrawing);
  }
  // TODO проверить метод удаления
  // * удалить рисунок
  async deleteDrawing(id: number) {
    const deleteResponse = await this.drawingRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new DrawingNotFoundException(id);
    }
  }

  // * сохранить изменения в данных о рисунке
  private async saveUpdateDrawing(id: number, drawing: Drawing) {
    await this.drawingRepository.save(drawing);
    return await this.drawingRepository.findOne(id, { relations: ['author'] });
  }
}
