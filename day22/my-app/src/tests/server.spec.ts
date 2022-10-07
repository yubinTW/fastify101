import { FastifyInstance } from 'fastify'
import { startServer } from '../server'
import { describe, beforeAll, expect, test, afterAll, afterEach } from 'vitest'
import { CatRepoImpl } from '../repos/cat-repo'
import * as dbHelper from 'testcontainers-mongoose'

describe('Server test', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    await dbHelper.connect('mongo')
    server = startServer(8888)
    await server.ready()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  test('Given a cat in db, when GET /cats, then get one record', async () => {
    // arrange
    const cat = {
      name: 'Fat Orange',
      weight: 7
    }
    await CatRepoImpl.of().addCat(cat)

    // act
    const response = await server.inject({
      method: 'GET',
      url: '/cats'
    })
    const cats = JSON.parse(response.body)['cats']

    // assert
    expect(cats).toHaveLength(1)
  })
})
