export class Middleware {
    findAll() {
        return async ({req, response}, next) => {
            await next()
            return response.res
        }
    }
}
