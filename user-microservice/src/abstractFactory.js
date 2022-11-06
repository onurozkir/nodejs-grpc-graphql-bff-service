export class AbstractFactory {
    constructor() {
        this.users = [
            { users : {userNumber: 1, name: "Onur", email: "onur.ozkir@trendyol.com", password: "****", age: 33}},
            { users : {userNumber: 2, name: "adasd", email: "asdasdasd@trendyol.com", password: "****", age: 24}},
        ];
    }
    async findAll({ request, response }) {
        response.res = {
            edges: this.users,
            pagination: {
                page: 1,
                offset: 10,
                totalCount: this.users.length
            }
        };
        return response.res;
    }

    async createUser({ request, response }) {

        response.res = { count : 1};

        return response.res;
    }

    async countUsers({ req, response }) {
        const count =  this.users.filter((user) => {
            for(let i in req.where) {
                 if(user.users[i] === req.where[i]) {
                     return user;
                 }

            }
        });

        response.res = { count : count.length};

        return response.res;
    }


}
