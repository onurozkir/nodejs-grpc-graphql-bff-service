export class AbstractFactory {
    constructor() {
        this.comments = [
            {id: 1, comment: "1.comment", userId: 1, postId: 1, createdAt: '2022-09-08 07:00:00'},
            {id: 2, comment: "2.comment", userId: 1, postId: 2, createdAt: '2022-09-08 07:00:00'}
        ];
    }
    async find({ req, response }) {
        const { where, limit, offset} = req;

        const filteredData = this.comments.filter((comment) => {
             for(let i in where) {
                 if(comment[i] === where[i]) {
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
        response.res = this.comments.filter((comment) => comment.id === req.id);
        return response.res;
    }

    async createComment({ req, response }) {
        const data =  { ...req, id : Math.floor(Math.random() * 50 ) + 1, createdAt: new Date().toISOString()} ;
        this.comments.push(data)
        response.res = data;
        return response.res;
    }

    async deleteComment({ req, response }) {
        const itemIndex = this.comments.indexOf(this.comments.find((comment) => comment.id === req.id));
        this.comments.splice(itemIndex, 1);
        response.res = { result : true};
        return response.res;
    }
}
