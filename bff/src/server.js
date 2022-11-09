import {ApolloServer, gql} from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Registry} from "./registry";

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
            cors: false,
            plugins: [
                {
                    requestDidStart(requestContext) {
                        return {
                            parsingDidStart(requestContext) {
                                console.log(`Query = ${requestContext.source.replace(/\n/g, '').split('  ').join(' ').trim()}`);
                            },
                        }
                    },
                    serverWillStart() {
                        console.log('Server starting up!');
                    },
                }
            ],
        });

        await server.start();

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(
            '/',
            cors(),
            bodyParser.json(),
        );
        app.get('/public-api/user/', async (req, res) => {// user?id=1
            const userId = req.query.id;
            const registry = new Registry();
            const {userService} = registry.services;
            const data = await userService.findById({id: userId});
            return res.send(data);
        });

        server.applyMiddleware({
            app,
            path: '/graphql'
        });
        return app
    }
}

export default Server;
