const Bluebird = require('bluebird');
const {
    commentService
} = require('./service')

export class AbstractFactory {
    constructor() {
        this.commentClient = Bluebird.promisifyAll(commentService);
        this.users = [
            {id: 1, name: "Onur", email: "onur.ozkir@trendyol.com", password: "****", age: 33},
            {id: 2, name: "adasd", email: "asdasdasd@trendyol.com", password: "****", age: 24},
        ];
    }

    async findAll({req, response}) {
        response.res = {
            data: this.users,
            pagination: {
                page: 1,
                offset: 10,
                totalCount: this.users.length
            }
        };
        return response.res;
    }

    async findById({req, response}) {
        response.res = this.users.find((user) => user.id === req.id);
        return response.res;
    }

    async createUser({req, response}) {
        const data = {...req, id: Math.floor(Math.random() * 50) + 1};
        this.users.push(data)
        response.res = data;
        return response.res;
    }

    async countUsers({req, response}) {
        const count = this.users.filter((user) => {
            for (let i in req.where) {
                if (user[i] === req.where[i]) {
                    return user;
                }

            }
        });

        response.res = {count: count.length};

        return response.res;
    }

    async getUserWithComment({req, response}) {
        const user = this.users.find((user) => user.id === req.id);
        const comment = await this.commentClient.findCommentsAsync({
            where: {
                userId: req.id,
            },
            limit: 0,
            offset: 100
        })

        response.res = { ...user, comments: comment.data};

        return response.res;
    }


}
