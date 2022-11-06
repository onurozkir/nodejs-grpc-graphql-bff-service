import Aigle from 'aigle';
import {isEmpty} from "lodash";

const {each, map, promisifyAll} = Aigle

class UserService {

    constructor(client) {
        this.client = promisifyAll(client);
        this._jsonFields= [];
    }


    async findAll(parent) {
        const result = await this.client.getAllUsersAsync(parent);

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

    async createuser(query) {
        const result = await this.client.countUserGrpcAsync(query);
        return result.count;
    }

    async countUser(query) {
        const result = await this.client.countUserGrpcAsync(query);
        return result.count;
    }

}

export default UserService;
