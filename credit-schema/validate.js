const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const schema = require('./schema')

const validator = new Ajv({ allErrors: true })
addFormats(validator)

const validate = (data) => {
  const validate = validator.compile(schema)
  return { valid: validate(data), errors: validate.errors }
}

module.exports = validate
