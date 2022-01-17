const countApi = require('countapi-js')

module.exports.registerVisit = async (event, context, callback) => {
  const { value: hits } = await countApi.hit('ton.com.br', 'home')
  callback(null, { statusCode: 200, body: JSON.stringify({ hits }) })
}
