import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { CatRepoImpl } from '../repos/cat-repo'

const CatRouter = (
  server: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (error?: Error) => void
) => {
  server.get('/cats', async (request, reply) => {
    try {
      const cats = await CatRepoImpl.of().getCats()
      return reply.status(200).send({ cats })
    } catch (error) {
      server.log.error(`GET /cats Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}

export { CatRouter }
