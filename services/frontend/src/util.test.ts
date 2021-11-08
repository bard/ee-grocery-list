import { foo } from './util'

test('foo', () => {
  const result = foo()
  expect(result).toBe(1)
})
