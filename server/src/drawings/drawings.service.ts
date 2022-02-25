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

// TODO сделать метод получения рисунков конкретного пользователя
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

    const file = `${hashedDrawingName}.jpg`;

    const url = `${process.env.API_URL}/public/${user.login}/${file}`;
    // TODO нужно ли делать сохранение файла асинхронным и обрабатывать ошибку?
    fs.writeFileSync(`${dirUser}/${hashedDrawingName}.jpg`, buffer);

    const newDrawing = await this.drawingRepository.create({
      ...drawing,
      url: url,
      file: file,
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

  // * удалить рисунок
  async deleteDrawing(id: number, user: User) {
    const deletedDrawing = await this.drawingRepository.findOne(id, {
      relations: ['author'],
    });

    if (!deletedDrawing) {
      throw new DrawingNotFoundException(id);
    }

    if (deletedDrawing.author.login !== user.login) {
      throw new ForbiddenException('Forbidden');
    }

    const deleteResponse = await this.drawingRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new DrawingNotFoundException(id);
    }
    // TODO нужно ли делать метод асинхронным и обрабатывать ошибку?
    const file = deletedDrawing.file;
    fs.unlinkSync(`./public/${user.login}/${file}`);
  }

  // * сохранить изменения в данных о рисунке
  private async saveUpdateDrawing(id: number, drawing: Drawing) {
    await this.drawingRepository.save(drawing);
    return await this.drawingRepository.findOne(id, { relations: ['author'] });
  }
}
