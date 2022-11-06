import main from './src/server'

const app = {}

async function gracefulExit() {
    const { server } = app

    if (server) await server.forceShutdown()

    process.exit(0)
}

;['SIGINT', 'SIGTERM', 'SIGHUP'].forEach((signal) => {
    process.on(signal, gracefulExit)
})

main()
    .then((obj) => {
        Object.assign(app, obj)
    })
    .catch((err) => {
        throw err
    })
