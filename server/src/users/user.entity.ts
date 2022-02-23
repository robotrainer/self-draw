import { Exclude } from 'class-transformer';
import Drawing from 'src/drawings/drawing.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Drawing, (drawing: Drawing) => drawing.author)
  public drawings: Drawing[];

  @ManyToMany(() => Drawing, (likeDrawing: Drawing) => likeDrawing.whoLikes)
  public likeDrawings: Drawing[];
}

export default User;
