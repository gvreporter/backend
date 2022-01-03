import {Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity, getConnection} from 'typeorm';
import { Article } from './Article';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    username: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Article, a => a.author)
    articles: Article[];

    static async login(username: string, password: string): Promise<User | null> {
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder()
            .addSelect('User.password')
            .where('username = :username', { username })
            .getOne();

        console.log(user);
        
        if(!user) return null;

        const pass = await bcrypt.compare(password, user.password);

        if(pass) {
            user.password = undefined;
            return user;
        }

        return null;
    }
}
