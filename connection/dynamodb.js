'use strict'

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

let options = {}

if (process.env.IS_OFFLINE || process.env.NODE_ENV === 'test') {
  options = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  }
}

const client = DynamoDBDocumentClient.from(new DynamoDBClient(options), {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: true,
  },
})

module.exports = client
