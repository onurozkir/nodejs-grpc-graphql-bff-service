import Aigle from 'aigle';

const { promisifyAll} = Aigle

class PostService {

    constructor(client) {
        this.client = promisifyAll(client);
    }


    async getPosts(filter) {
        const result = await this.client.getPostsAsync({
            ...filter.filterBy,
            limit: filter.limit,
            offset: filter.offset
        });

        let { data  }  = result || [];
        return {
            post: data,
            pagination: result.pagination
        };
    }

    async createUser(data) {
        return await this.client.createUserAsync(data);
    }

    async countUser(query) {
        const result = await this.client.countUserGrpcAsync(query);
        return result.count;
    }

}

export default PostService;
