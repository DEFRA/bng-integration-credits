const validate = require('../credit-schema/validate')

const sendResponse = (context, status, body) => {
  context.res = {
    status,
    body
  }
}

module.exports = async function (context, req) {
  try {
    if (!req.body) {
      return sendResponse(context, 400, 'No message received.')
    }

    const isValid = validate(req.body)
    if (!isValid.valid) {
      console.log(isValid.errors)
      return sendResponse(context, 422, isValid.errors)
    }

    return sendResponse(context, 200, 'Valid message received.')
  } catch (error) {
    return sendResponse(context, 500, error)
  }
}
