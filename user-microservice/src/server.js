import path from 'path';
import Mali from 'mali';
import {AbstractFactory} from "./abstractFactory";
import {Middleware} from "./middleware";
import loggerMiddleware from '@malijs/logger'

const HOST_PORT = `0.0.0.0:6150`;
const SERVICE_PROTO = path.resolve(__dirname, '__proto/user.proto')

const main = async () => {

    const middleware = new Middleware();
    const abstractFactory = new AbstractFactory();

    const UserService = {
        getAllUsers: [middleware.findAll(), abstractFactory.findAll.bind(abstractFactory)],
        countUserGRPC:  abstractFactory.countUsers.bind(abstractFactory),
    }
    const server = new Mali();
    server.addService(SERVICE_PROTO, null, {
        keepCase: true,
        enums: String,
        oneofs: true
    })

    server.use(
        loggerMiddleware({
            timestamp: true,
            request: true,
            response: true
        })
    )

    server.use(UserService);

    await server.start(HOST_PORT)

    console.info(`gRPC Server is now listening on port ${HOST_PORT}`)

    return {
        server
    };
}

export default main;
