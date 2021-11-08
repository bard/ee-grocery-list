import { createService } from './service'
import { createMemoryDb } from './memory-db'

const main = async () => {
  const service = createService({
    port:
      process.env.PORT === undefined
        ? 3000
        : parseInt(process.env.PORT, 10),
    db: createMemoryDb({ groceries: [] }),
  })

  await service.start()
}

main()
