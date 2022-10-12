import fastify, { FastifyInstance } from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'
import keycloak, { KeycloakOptions } from 'fastify-keycloak-adapter'

const server: FastifyInstance = fastify()

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  server.listen(fastifyConfig, (error, _) => {
    if (error) {
      console.error(error)
    }
  })

  server.register(fastifyStatic, {
    root: path.join(__dirname, '../../frontend/build'),
    prefix: '/'
  })

  const opts: KeycloakOptions = {
    appOrigin: 'http://localhost:8888',
    keycloakSubdomain: 'localhost:8080/auth/realms/demo',
    clientId: 'client01',
    clientSecret: 'O9uEfbDHxXgpqET7RVzWnXHE6ecSlR7F'
  }

  server.register(keycloak, opts)

  server.get('/hello', async (request, reply) => {
    return reply.status(200).send({
      message: 'Hello World'
    })
  })

  return server
}

export { startServer }
