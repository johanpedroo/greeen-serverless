const { registerVisit } = require('./register')

test('Registering a visit', async () => {
  await registerVisit(null, null, (errorMessage, payload) => {
    const body = JSON.parse(payload.body)
    expect(body.hits).toBeGreaterThan(0)
    expect(payload.statusCode).toBe(200)
    expect(errorMessage).toBe(null)
  })
})
