const { SchemaValidation } = require('../../libs/schemaValidation')
const User = require('../../models/User')

module.exports.createUser = async (event, context, callback) => {
  try {
    const body = JSON.parse(event.body)
    const schemaValidationResponse = await SchemaValidation(User.schema)(body)

    if (schemaValidationResponse.error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          error: schemaValidationResponse.error.message,
        }),
      })

    const user = new User(body)

    const saveUserResponse = await user.save()

    return callback(null, saveUserResponse)
  } catch (e) {
    console.log(e)
    return callback(null, {
      statusCode: 500,
    })
  }
}
