import main from './src/main'

const app = {}

async function gracefulExit() {
    const { httpServer } = app

    if (httpServer) httpServer.close()

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
