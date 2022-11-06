import path from 'path';
import Mali from 'mali';
import {AbstractFactory} from "./abstractFactory";
import loggerMiddleware from '@malijs/logger'

const HOST_PORT = `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`;
const POST_PROTO = path.resolve(__dirname, '__proto/post.proto')

const main = async () => {

    const abstractFactory = new AbstractFactory();

    const UserService = {
        getAllPost: abstractFactory.findAll.bind(abstractFactory),
        findById: abstractFactory.findById.bind(abstractFactory),
        createPost : abstractFactory.createPost.bind(abstractFactory)
    }
    const server = new Mali();
    server.addService(POST_PROTO, null, {
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
