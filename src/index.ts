import "reflect-metadata";
require('dotenv').config();
import {createConnection, getConnectionOptions} from "typeorm";
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


(async () => {
    const connectOptions = await getConnectionOptions();
    
    Object.assign(connectOptions, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    await createConnection(connectOptions);
    
    try {
        await server.listen(8080);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
