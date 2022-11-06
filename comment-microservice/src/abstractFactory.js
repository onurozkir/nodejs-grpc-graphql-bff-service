export class AbstractFactory {
    constructor() {
        this.comments = [
            { comment : {id: 1, comment: "1.comment", userId: 1, postId: 1, createdAt: '2022-09-08 07:00:00'}},
            { comment : {id: 2, comment: "2.comment", userId: 1, postId: 2, createdAt: '2022-09-08 07:00:00'}}
        ];
    }
    async find({ req, response }) {
        const { where, limit, offset} = req;

        const filteredData = this.comments.filter((comment) => {
             for(let i in where) {
                 if(comment.comment[i] === where[i]) {
                    return comment;
                 }
             }
        })
        response.res = {
            data: filteredData.slice(limit, offset),
            pagination: {
                page: limit,
                offset: offset,
                totalCount: this.comments.length
            }
        };
        return response.res;
    }

    async findById({ req, response }) {
        response.res = this.comments.filter((user) => user.comment.id === req.id);
        return response.res;
    }

    async createComment({ req, response }) {
        const data =  { ...req, id : Math.floor(Math.random() * 50 ) + 1, createdAt: new Date().toISOString()} ;
        this.comments.push({ comment : data })
        response.res = data;
        return response.res;
    }

    async deleteComment({ req, response }) {
        response.res = true;
        return response.res;
    }


}
