import slugify from 'slugify';
import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';

@Entity()
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @ManyToOne(() => User, u => u.articles)
    author: User

    @BeforeUpdate()
    @BeforeInsert()
    private generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }

}
