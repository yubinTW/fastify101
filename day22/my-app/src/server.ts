import fastify, { FastifyInstance } from 'fastify'
import { CatRouter } from './routes/cat'

const server: FastifyInstance = fastify({
  logger: true
})

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  server.listen(fastifyConfig)

  server.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'Hello World' })
  })

  // mongoose.connect('mongodb://localhost:27017/my-fastify')
  server.register(CatRouter)

  return server
}

export { startServer }
