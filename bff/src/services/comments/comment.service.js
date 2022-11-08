const Bluebird = require('bluebird');

class CommentService {

    constructor(client) {
        this.client = Bluebird.promisifyAll(client);
    }

    async findComment(filter) {
        const result = await this.client.findCommentsAsync({
            ...filter.filterBy,
            limit: filter.limit,
            offset: filter.offset
        });
        let { data } = result || [];
        return {
            comment: data,
            pagination: result.pagination
        };
    }

    async createComment(data) {
        return await this.client.createCommentAsync(data);
    }

    async deleteComment(data) {
        return await this.client.deleteCommentAsync(data);
    }



}

export default CommentService;
