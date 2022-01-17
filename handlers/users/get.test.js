const User = require('../../models/User');
const users = require('../../__tests__/seeds/users.json')
const { getUser } = require('./get')

beforeAll(() => {
  jest.spyOn(User, 'getById').mockImplementation((id) => {
    if (id === users[0].id) return Promise.resolve({ Item: users[0] })
    return Promise.resolve({})
  });
});

test('Getting user by id', async () => {
  const { id } = users[0]
  await getUser({ pathParameters: { id } }, null, (errorMessage, payload) => {
    const body = payload.body
    expect(payload).toBe(users[0])
    expect(errorMessage).toBe(null)
  })
})
