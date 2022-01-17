const { GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb')
const Dynamo = require('../connection/dynamodb')
const {ddb} = require('../connection/dynamodb')
const { v4: uuid } = require('uuid')
const Joi = require('joi').extend(require('@joi/date'))

class User {
  #data = {}

  constructor(data) {
    this.#data = data
  }

  save() {
    this.#data.id = uuid()
    return Dynamo.send(
      new PutCommand({
        TableName: `${process.env['DYNAMODB_TABLE']}-users`,
        Item: this.#data,
      })
    ).then(() => this.#data)
  }

  get data() {
    return this.#data
  }

  static getById(id) {
    return Dynamo.send(
      new GetCommand({
        TableName: `${process.env['DYNAMODB_TABLE']}-users`,
        Key: {
          id,
        },
      })
    )
  }

  static schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    taxId: Joi.string().alphanum().length(11).required(),
    phone: Joi.string().alphanum().length(11),
    birthday: Joi.date().format('YYYY-MM-DD'),
    address: Joi.object({
      street: Joi.string().max(80).required(),
      number: Joi.number().max(5),
      complement: Joi.string().max(50),
      city: Joi.string().max(50).required(),
      state: Joi.string().max(30).required(),
      country: Joi.string().max(30).required(),
      zipCode: Joi.string().alphanum().length(8).required(),
    }).optional(),
  })
}

module.exports = User
