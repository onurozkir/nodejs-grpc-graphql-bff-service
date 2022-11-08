import path from 'path';
import Mali from 'mali';
import {AbstractFactory} from "./abstractFactory";
import {Middleware} from "./middleware";
import loggerMiddleware from '@malijs/logger'

const HOST_PORT = `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`;
const SERVICE_PROTO = path.resolve(__dirname, '__proto/user.proto')

const main = async () => {

    const middleware = new Middleware();
    const abstractFactory = new AbstractFactory();

    const UserService = {
        getAllUsers: abstractFactory.findAll.bind(abstractFactory),
        findById: abstractFactory.findById.bind(abstractFactory),
        countUserGRPC:  abstractFactory.countUsers.bind(abstractFactory),
        createUser : abstractFactory.createUser.bind(abstractFactory)
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
