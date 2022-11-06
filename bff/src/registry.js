import * as grpc from 'grpc';

import UsersServiceClient from './services/users/user.client'
import UserService from "./services/users/user.service";

export class Registry {

    constructor() {
        const grpcCredentials = grpc.credentials.createInsecure();

        const usersServiceClient = new UsersServiceClient('0.0.0.0:6150', grpcCredentials);

        this._services =  {
            userService: new UserService(usersServiceClient)
        }
    }
    get services() {
        return this._services;
    }
}
