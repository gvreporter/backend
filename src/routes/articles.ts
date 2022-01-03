import { FastifyPluginAsync, FastifyPluginOptions, RouteHandlerMethod } from 'fastify';
import { Article } from '../entity/Article';

const plugin: FastifyPluginAsync = async (server, opts: FastifyPluginOptions) => {
    server.get('/', getAllArticles);
}

const getAllArticles: RouteHandlerMethod = async (request, reply) => {
    const [ articles, count ] = await Article.findAndCount({ relations: ['author'] });

    return {
        data: articles,
        count: count,
    };
};

export default plugin;