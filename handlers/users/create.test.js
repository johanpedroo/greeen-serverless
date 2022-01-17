const { createUser } = require('./create')
const users = require('../../__tests__/seeds/users.json')
const User = require('../../models/User')

beforeAll(() => {
  jest.spyOn(User.prototype, 'save').mockImplementation(() => {
    return Promise.resolve(users[0])
  })
})

test('Creating a user', async () => {
  const { id, ...user } = users[0]
  await createUser(
    { body: JSON.stringify(user) },
    null,
    (errorMessage, payload) => {
      expect(payload).toBe(users[0])
      expect(errorMessage).toBe(null)
    }
  )
})

test('Creating a user with wrong schema', async () => {
  await createUser(
    { body: JSON.stringify(users[0]) },
    null,
    (errorMessage, payload) => {
      const body = payload.body
      expect(payload.statusCode).toBe(400)
      expect(errorMessage).toBe(null)
    }
  )
})
