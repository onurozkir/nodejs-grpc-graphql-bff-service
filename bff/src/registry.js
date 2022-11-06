import * as grpc from 'grpc';

import UsersServiceClient from './services/users/user.client'
import PostsServiceClient from "./services/posts/post.client";
import CommentsServiceClient from "./services/comments/comment.client";
import UserService from "./services/users/user.service";
import PostService from "./services/posts/post.service";
import CommentService from "./services/comments/comment.service";
import * as config from "./config";


export class Registry {

    constructor() {
        const grpcCredentials = grpc.credentials.createInsecure();

        const usersServiceClient = new UsersServiceClient(config.USERS_GRPC_URL, grpcCredentials);
        const postsServiceClient = new PostsServiceClient(config.POSTS_GRPC_URL, grpcCredentials);
        const commentsServiceClient = new CommentsServiceClient(config.COMMENTS_GRPC_URL, grpcCredentials);

        this._services =  {
            userService: new UserService(usersServiceClient),
            postService: new PostService(postsServiceClient),
            commentService: new CommentService(commentsServiceClient),
        }
    }
    get services() {
        return this._services;
    }
}
