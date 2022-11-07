export class AbstractFactory {
    constructor() {
        this.posts = [
            {id: 1, title: "1.başlık", content: " 1. başlık içerik", userId: 1, createdAt: '2022-10-10'},
            {id: 2, title: "2.başlık", content: " 2. başlık içerik", userId: 2, createdAt: '2022-10-11'},
        ];
    }

    async findPosts({req, response}) {
        const {where, limit, offset} = req;
        const filteredData = this.posts.filter((post) => {
            for (let i in where) {
                if (post[i] === where[i]) {
                    return post;
                }
            }
        })
        response.res = {
            data: filteredData.slice(limit, offset),
            pagination: {
                page: limit,
                offset: offset,
                totalCount: this.posts.length
            }
        };
        return response.res;
    }

    async findById({req, response}) {
        response.res = this.posts.filter((post) => post.id === req.id);
        return response.res;
    }

    async createPost({req, response}) {
        const data = {...req, id: Math.floor(Math.random() * 50) + 1, createdAt: new Date().toISOString()};
        this.posts.push(data)
        response.res = data;
        return response.res;
    }

    async deletePost({ req, response }) {
        const itemIndex = this.posts.indexOf(this.posts.find((post) => post.id === req.id));
        this.posts.splice(itemIndex, 1);
        response.res = { result : true};
        return response.res;
    }
}
