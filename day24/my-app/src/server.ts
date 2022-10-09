import fastify, { FastifyInstance } from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import * as minio from 'minio'

const server: FastifyInstance = fastify({
  logger: true
})

const minioClient = new minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'user01',
  secretKey: 'user01password'
})

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  server.listen(fastifyConfig)

  server.register(fastifyMultipart)

  const bucketName = 'bucket01'

  server.post('/uploads', async (request, reply) => {
    try {
      const data = await request.file()
      if (data) {
        const filename = data.filename

        const fileBuffer = await data.toBuffer()

        const metaData = {
          key01: 'value01'
        }

        await minioClient.putObject(bucketName, filename, fileBuffer, metaData)

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
