import {ApolloServer, gql} from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {Registry} from "./registry";
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { defaultFieldResolver } = require('graphql');

const upperDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {

        // Executes once for each object field in the schema
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {

            // Check whether this field has the specified directive
            const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

            if (upperDirective) {

                // Get this field's original resolver
                const {resolve = defaultFieldResolver} = fieldConfig;

                // Replace the original resolver with a function that *first* calls
                // the original resolver, then converts its result to upper case
                fieldConfig.resolve = async function (source, args, context, info) {
                    const result = await resolve(source, args, context, info);
                    if (typeof result === 'string') {
                        return result.toUpperCase();
                    }
                    return result;
                }
                return fieldConfig;
            }
        }
    });
}


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
        app.get('/public-api/user/', async (req, res) => {// users/name?name=Alex
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
