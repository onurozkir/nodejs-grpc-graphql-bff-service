import path from 'path'

import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const SERVICE_PROTO = path.resolve(__dirname, '../../__proto/comment.proto')
const packageDefinition = protoLoader.loadSync(SERVICE_PROTO, {
    keepCase: true,
    enums: String,
    oneofs: true
});

const commentProto = grpc.loadPackageDefinition(packageDefinition);

const CommentsServiceClient = commentProto.comment.CommentsService;

export default CommentsServiceClient
