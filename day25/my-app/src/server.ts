import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  DoneFuncWithErrOrRes
} from 'fastify'
import fastifyBasicAuth from '@fastify/basic-auth'

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

  function validate(
    username: string,
    password: string,
    request: FastifyRequest,
    reply: FastifyReply,
    done: DoneFuncWithErrOrRes
  ) {
    if (username === 'user01' && password === 'user01password') {
      done()
    } else {
      done(new Error('username or password incorrect'))
    }
  }

  server.register(fastifyBasicAuth, {
    validate
  })

  server.after(() => {
    server.get('/', { onRequest: server.basicAuth }, (request, reply) => {
      request
      return reply.status(200).send({ message: 'Hello user01' })
    })
  })

  server.get('/hello', (request, reply) => {
    return reply.status(200).send({ message: 'Hello World' })
  })

  return server
}

export { startServer }
