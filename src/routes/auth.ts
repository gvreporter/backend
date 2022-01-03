import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';
import { User } from '../entity/User';

const plugin: FastifyPluginAsync = async (server, opt) => {
    server.post<{ Body: { username: string, password: string } }>(
        '/login', 
        {
            schema: {
                body: {
                    username: Type.String({ maxLength: 64 }),
                    password: Type.String({ minLength: 8, maxLength: 128 })
                }
            }
        },
        async (request, reply) => {
            const { username, password } = request.body;
            const user = await User.login(username, password);

            if(user) {
                return user;
            }

            reply.status(401);
            return {
                error: 'Username and/or password incorrect'
            }
        }
    );
};

export default plugin;