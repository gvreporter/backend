import "reflect-metadata";
import {createConnection} from "typeorm";
import Fastify from 'fastify';
import articles from './routes/articles';

const server = Fastify({
    logger: {
        prettyPrint: true
    }
});

server.register(articles, { prefix: '/articles' });

createConnection().then(async () => {
    try {
        await server.listen(8080);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
