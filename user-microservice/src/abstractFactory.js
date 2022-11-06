export class AbstractFactory {
    constructor() {
        this.users = [
            { users : {id: 1, name: "Onur", email: "onur.ozkir@trendyol.com", password: "****", age: 33}},
            { users : {id: 2, name: "adasd", email: "asdasdasd@trendyol.com", password: "****", age: 24}},
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

    async findById({ req, response }) {
        response.res = this.users.filter((user) => user.users.userNumber === req.id);
        return response.res;
    }

    async createUser({ req, response }) {
        console.log('req', req);
        const data =  { ...req, id : Math.floor(Math.random() * 50 ) + 1} ;
        this.users.push({ users : data })
        response.res = data;
        console.log('response.res ', response.res );
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
