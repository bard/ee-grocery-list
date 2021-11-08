import express from 'express'
import 'express-async-errors'
import http from 'http'

import { createMemoryDb } from './memory-db'

export const createService = ({
  port,
  db,
}: {
  port: number
  db: ReturnType<typeof createMemoryDb>
}) => {
  const app = express()

  app.get('/api/groceries', async (req, res) => {
    res.json(await db.get())
  })

  app.put(
    '/api/groceries',
    express.json(),
    // TODO validate(req.body, updateInputSchema),
    async (req, res) => {
      await db.put(req.body)

      res.status(200).end()
    },
  )

  let server: http.Server | null = null
  return {
    start() {
      return new Promise<http.Server>((resolve) => {
        server = app.listen(port, () => {
          if (server === null) throw new Error('Could not initialize')
          resolve(server)
        })
      })
    },

    async stop() {
      return new Promise<void>((resolve, reject) => {
        if (server === null) {
          throw new Error('Server not running')
        }
        server.close((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    },
  }
}
