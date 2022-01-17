const SchemaValidation = (validationSchema) => async (body) => {
  return validationSchema.validate(body, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "'",
      },
    },
  })
}

module.exports.SchemaValidation = SchemaValidation
