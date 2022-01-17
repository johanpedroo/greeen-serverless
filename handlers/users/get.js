const User = require('../../models/User')

module.exports.getUser = async (event, context, callback) => {
  const user = await User.getById(event.pathParameters.id)
  if (user.Item) return callback(null, user.Item)
  return callback(null, {
    statusCode: 404,
  })
}
