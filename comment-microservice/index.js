import main from './src/server'

const app = {}


main()
    .then((obj) => {
        Object.assign(app, obj)
    })
    .catch((err) => {
        throw err
    })
