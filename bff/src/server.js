import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const Server = {
    async init(schema, resolvers, services) {
        const app = express();
        const server = new ApolloServer({
            typeDefs: gql(schema),
            resolvers: resolvers,
            context: async ({req, res}) => ({
                req,
                res,
                ...services
            }),
            cors: false
        });

        await server.start();

        app.use(
            '/',
            cors(),
            bodyParser.json(),
        );

        server.applyMiddleware({
            app,
            path: '/'
        });
        return app
    }
}

export default Server;
