const Bluebird = require('bluebird');

class UserService {

    constructor(client) {
        this.client = Bluebird.promisifyAll(client);
    }

    async findAll(filter) {
        console.log('this.client', this.client);
        const result = await this.client.getAllUsersAsync();

        console.log('result', result);
        console.log('filter', filter);

        let { data } = result || [];
        return {
            users: data,
            pagination: result.pagination
        };
    }

    async findById(filter) {
       return await this.client.findByIdAsync(filter);
    }

    async createUser(data) {
        return await this.client.createUserAsync(data);
    }

    async countUser(query) {
        const result = await this.client.countUserGRPCAsync(query);
        return result.count;
    }

}

export default UserService;
