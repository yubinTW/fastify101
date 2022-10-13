import fastify, { FastifyInstance } from 'fastify'

const server: FastifyInstance = fastify({
  logger: true
})

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  server.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'Hello World' })
  })

  server.listen(fastifyConfig)

  return server
}

export { startServer }
