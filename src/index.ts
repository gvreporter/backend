import "reflect-metadata";
import {createConnection} from "typeorm";
import Fastify from 'fastify';
import articles from './routes/articles';
import auth from './routes/auth';

const server = Fastify({
    logger: {
        prettyPrint: true,
    },
    disableRequestLogging: true
});

server.register(articles, { prefix: '/articles' });
server.register(auth, { prefix: '/auth' });

createConnection().then(async () => {
    try {
        await server.listen(8080);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
