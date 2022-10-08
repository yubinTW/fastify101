import fastify, { FastifyInstance } from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fs from 'fs'
import { pipeline } from 'stream'
import util from 'util'

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

  server.register(fastifyMultipart)

  server.post('/uploads', async (request, reply) => {
    try {
      const data = await request.file()
      if (data) {
        const filename = data.filename

        const pump = util.promisify(pipeline)

        await pump(data.file, fs.createWriteStream(`uploads/${filename}`))

        return reply
          .status(201)
          .send({ message: `Successfully upload file: ${filename}` })
      } else {
        return reply.status(400).send({ message: `Failed to upload file` })
      }
    } catch (error) {
      return reply.status(500).send({ error })
    }
  })

  server.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'Hello World' })
  })

  return server
}

export { startServer }
