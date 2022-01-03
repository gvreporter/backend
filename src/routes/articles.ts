import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, FastifyPluginOptions, RouteHandlerMethod } from 'fastify';
import { MoreThan } from 'typeorm';
import { Article } from '../entity/Article';
import { generatePaginatedOptions, paginate } from '../utils/paginate';

const plugin: FastifyPluginAsync = async (server, opts: FastifyPluginOptions) => {
    server.get<{Querystring: { page?: number }}>('/', { schema: { querystring: { page: Type.Number({ minimum: 1, default: 1 }) } } }, async (request, reply) => {
        return paginate<Article>(request.query.page, { relations: ['author'] }, (o) => Article.findAndCount(o));

    });
}

export default plugin;