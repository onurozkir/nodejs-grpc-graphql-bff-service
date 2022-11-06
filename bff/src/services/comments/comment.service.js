import Aigle from 'aigle';
import {isEmpty} from "lodash";

const {each, map, promisifyAll} = Aigle

class CommentService {

    constructor(client) {
        this.client = promisifyAll(client);
        this._jsonFields= [];
    }


    async findComment(filter) {
        const result = await this.client.findCommentsAsync({
            ...filter.filterBy,
            limit: filter.limit,
            offset: filter.offset
        });

        let { data } = result

        data = data || [] ;

        data = await map(data, async (datum) => {
            const { comment } = datum

            if (!isEmpty(comment)) {
                await each(this._jsonFields, async (field) => {
                    if (Buffer.isBuffer(comment[field])) {
                        const json = comment[field].toString()

                        if (!isEmpty(json)) comment[field] = JSON.parse(json)
                    }
                })
            }

            return {
                comment
            }
        })
        return {
            comment: data.map((data) => data.comment),
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
