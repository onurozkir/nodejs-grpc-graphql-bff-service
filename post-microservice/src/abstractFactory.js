export class AbstractFactory {
    constructor() {
        this.posts = [
            { post : {id: 1, title: "1.başlık", content: " 1. başlık içerik", userId: 1, createdAt: '2022-10-10'}},
            { post : {id: 2, title: "2.başlık", content: " 2. başlık içerik", userId: 2, createdAt: '2022-10-11'}},
        ];
    }
    async findAll({ request, response }) {
        response.res = {
            edges: this.posts,
            pagination: {
                page: 1,
                offset: 10,
                totalCount: this.posts.length
            }
        };
        return response.res;
    }

    async findById({ req, response }) {
        response.res = this.posts.filter((user) => user.post.id === req.id);
        return response.res;
    }

    async createPost({ req, response }) {
        const data =  { ...req, id : Math.floor(Math.random() * 50 ) + 1} ;
        this.posts.push({ post : data })
        response.res = data;
        return response.res;
    }
}
