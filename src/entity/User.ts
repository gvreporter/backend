import {Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity} from 'typeorm';
import { Article } from './Article';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Article, a => a.author)
    articles: Article[];

}
