const path = require('path')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const COMMENT_HOST_PORT = `0.0.0.0:6160`;
const COMMENT_PROTO = path.resolve(__dirname, '__proto/comment.proto')

const packageDefinition = protoLoader.loadSync(
    COMMENT_PROTO,
    {
        keepCase: true,
        enums: String,
        oneofs: true
    });

  console.log(__dirname);
const {CommentsService} = grpc.loadPackageDefinition(packageDefinition).comment;

module.exports = {
    commentService: new CommentsService(COMMENT_HOST_PORT, grpc.credentials.createInsecure())
}

