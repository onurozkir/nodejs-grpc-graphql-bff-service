import path from 'path'

import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const SERVICE_PROTO = path.resolve(__dirname, '../../__proto/user.proto')
const packageDefinition = protoLoader.loadSync(SERVICE_PROTO, {
    keepCase: true,
    enums: String,
    oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition);

const UsersServiceClient = userProto.user.UsersService;

export default UsersServiceClient
