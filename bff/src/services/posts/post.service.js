import Aigle from 'aigle';
import {isEmpty} from "lodash";

const {each, map, promisifyAll} = Aigle

class PostService {

    constructor(client) {
        this.client = promisifyAll(client);
        this._jsonFields= [];
    }


    async findAll(data) {
        const result = await this.client.getAllUsersAsync(data);

        let { edges } = result

        edges = edges || [] ;

        edges = await map(edges, async (edge) => {
            const { users } = edge

            if (!isEmpty(users)) {
                await each(this._jsonFields, async (field) => {
                    if (Buffer.isBuffer(users[field])) {
                        const json = users[field].toString()

                        if (!isEmpty(json)) users[field] = JSON.parse(json)
                    }
                })
            }

            return {
                users
            }
        })

        return edges.map((edge) => edge.users);
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
