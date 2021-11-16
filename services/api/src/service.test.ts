import fetch from 'node-fetch'

import { createService } from './service'
import { createMemoryDb } from './memory-db'

describe('/api', () => {
  let service: ReturnType<typeof createService>
  let baseUrl: string
  const TEST_DATA = {
    groceries: [
      { checked: true, title: 'Fruit' },
      { checked: false, title: 'Milk' },
      { checked: false, title: 'Peanut Butter' },
    ],
  }

  beforeEach(async () => {
    service = createService({ port: 5000, db: createMemoryDb(TEST_DATA) })
    // TODO: port should be dynamic in test env
    await service.start()
    baseUrl = 'http://localhost:5000'
  })

  afterEach(async () => {
    await service.stop()
  })

  describe('GET /api/groceries', () => {
    test('retrieves groceries list', async () => {
      const res = await fetch(baseUrl + '/api/groceries', {
        headers: { accept: 'application/json' },
      })

      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data).toEqual(TEST_DATA)
    })
  })

  describe('PUT /api/groceries', () => {
    test('updates groceries list', async () => {
      const resUpdate = await fetch(baseUrl + '/api/groceries', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          groceries: [
            { checked: true, title: 'Fruit', price: null },
            { checked: true, title: 'Milk', price: 1.25 },
            { checked: true, title: 'Peanut Butter', price: 2 },
          ],
        }),
      })

      expect(resUpdate.status).toBe(200)

      const resGet = await fetch(baseUrl + '/api/groceries', {
        headers: { accept: 'application/json' },
      })

      expect(await resGet.json()).toEqual({
        groceries: [
          { checked: true, title: 'Fruit', price: null },
          { checked: true, title: 'Milk', price: 1.25 },
          { checked: true, title: 'Peanut Butter', price: 2 },
        ],
      })
    })

    test.todo('rejects invalid input with 400')
  })
})
