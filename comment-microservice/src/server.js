import path from 'path';
import Mali from 'mali';
import {AbstractFactory} from "./abstractFactory";
import loggerMiddleware from '@malijs/logger'

const HOST_PORT = `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`;
const COMMENT_PROTO = path.resolve(__dirname, '__proto/comment.proto')

const main = async () => {

    const abstractFactory = new AbstractFactory();

    const CommentService = {
        findComments: abstractFactory.find.bind(abstractFactory),
        findById: abstractFactory.findById.bind(abstractFactory),
        createComment:  abstractFactory.createComment.bind(abstractFactory),
        deleteComment : abstractFactory.deleteComment.bind(abstractFactory)
    }
    const server = new Mali();
    server.addService(COMMENT_PROTO, null, {
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

    server.use(CommentService);

    await server.start(HOST_PORT)

    console.info(`gRPC Server is now listening on port ${HOST_PORT}`)

    return {
        server
    };
}

export default main;
