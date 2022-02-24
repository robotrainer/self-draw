import User from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Drawing {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;
  // TODO убрать заглушку
  @Column()
  public url: string;

  @Column()
  public file: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createDate: Date;

  @Column({ default: 0 })
  public likes: number;

  @ManyToMany(() => User, (whoLike: User) => whoLike.likeDrawings, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public whoLikes: User[];

  @Column({ default: false })
  public publication: boolean;

  @ManyToOne(() => User, (author: User) => author.drawings)
  public author: User;
}

export default Drawing;
