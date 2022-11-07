import path from "path";
import fs from "fs";
import glob from 'glob';
import Aigle from 'aigle';
const resolver = require('./resolver');

const { map, reduce } = Aigle;

import {Registry} from "./registry"; // eslint-disable-line
import Server from './server';
import {assign, startCase} from "lodash";

const main = async () => {
    const schemaPaths = glob.sync(path.resolve(__dirname, 'schema/*.schema.graphql'));
    const schema = await reduce(
        schemaPaths,
        (schemaContents, filePath) => {
            const fileContents = fs.readFileSync(filePath, {
                encoding: 'utf8'
            })

            return schemaContents.concat(fileContents)
        },
        ''
    );

    const serviceRegistry = new Registry();
    const server = await Server.init(
        schema,
        resolver,
        serviceRegistry.services
    );

    const httpServer = server.listen(process.env.GRAPHQL_PORT,
        () => {
            console.info(`GraphQL Server is now running on port ${process.env.GRAPHQL_PORT}`)
        }
    )

    return {
        httpServer
    }

}

export default main;
