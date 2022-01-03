import slugify from 'slugify';
import {AfterInsert, AfterLoad, BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { URL } from 'url';
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

    markdownUrl: string;

    @BeforeUpdate()
    @BeforeInsert()
    private generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }

    @AfterLoad()
    @AfterInsert()
    private loadMarkdownUrl() {
        this.markdownUrl = new URL(`${this.id}.md`, process.env.ARTICLES_BASE_URL).href;
    }

}
