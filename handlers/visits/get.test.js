const { getVisits } = require('./get')

test('Getting a visit quantity', async () => {
  await getVisits(null, null, (errorMessage, payload) => {
    const body = JSON.parse(payload.body)
    expect(body.value).toBeGreaterThanOrEqual(0)
    expect(payload.statusCode).toBe(200)
    expect(errorMessage).toBe(null)
  })
})
