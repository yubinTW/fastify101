import fastify, { FastifyInstance } from 'fastify'
import { createTerminus } from '@godaddy/terminus'

const server: FastifyInstance = fastify({
  logger: true
})

function onSignal() {
  console.log('server is starting cleanup')
  return Promise.all([
    // your clean logic, like closing database connections
  ])
}

async function onShutdown() {
  console.log('cleanup finished, server is shutting down')
}

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  createTerminus(server.server, {
    onShutdown,
    onSignal
  })

  server.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'Hello World' })
  })

  server.listen(fastifyConfig)

  return server
}

export { startServer }
