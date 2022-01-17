const countApi = require('countapi-js')

module.exports.getVisits = async (event, context, callback) => {
  try {
    const responseVisitStats = await countApi.get('ton.com.br', 'home')

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(responseVisitStats),
    })
  } catch (e) {
    return callback('Error on obtain data from countApi', {
      statusCode: 500,
    })
  }
}
