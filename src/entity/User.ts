import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from 'typeorm';
import { Article } from './Article';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Article, a => a.author)
    articles: Article[];

}
