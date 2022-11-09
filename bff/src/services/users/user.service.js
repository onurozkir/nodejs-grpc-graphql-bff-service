const Bluebird = require('bluebird');

class UserService {

    constructor(client) {
        this.client = Bluebird.promisifyAll(client);
    }

    async findAll(filter) {
        const result = await this.client.getAllUsersAsync(filter);

        let { data } = result || [];
        return {
            users: data,
            pagination: result.pagination
        };
    }

    async findById(filter) {
        console.log('filter', filter);
       return await this.client.findByIdAsync(filter);
    }

    async createUser(data) {
        return await this.client.createUserAsync(data);
    }

    async countUser(query) {
        const result = await this.client.countUserGRPCAsync(query);
        return result.count;
    }

    async getUserWithComment(query) {
        return await this.client.getUserWithCommentAsync(query);
    }

}

export default UserService;
