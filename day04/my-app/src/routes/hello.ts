import { FastifyPluginAsync } from 'fastify'

const hello: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/hello', async function (request, reply) {
    return { message: 'Hello World' }
  })
}

export default hello
