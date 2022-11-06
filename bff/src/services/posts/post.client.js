import path from 'path'
import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const SERVICE_PROTO = path.resolve(__dirname, '../../__proto/post.proto')
const packageDefinition = protoLoader.loadSync(SERVICE_PROTO, {
    keepCase: true,
    enums: String,
    oneofs: true
});

const postProto = grpc.loadPackageDefinition(packageDefinition);

const PostsServiceClient = postProto.post.PostsService;

export default PostsServiceClient
