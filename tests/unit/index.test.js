const httpTrigger = require('../../bng-integration-credits-api')

const context = {
  res: {}
}

const schemaErrors = [
  {
    instancePath: '',
    schemaPath: '#/type',
    keyword: 'type',
    params: {
      type: 'object'
    },
    message: 'must be object'
  }
]

describe('Function Tests', () => {
  beforeEach(() => {
    context.res = {}
    jest.resetModules()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return 400 for no message', async () => {
    const request = {
      body: null
    }

    await httpTrigger(context, request)

    expect(context.res.status).toEqual(400)
    expect(context.res.body).toEqual('No message received.')
  })

  it('should return 422 for JSON schema validation faliure', async () => {
    const request = {
      body: '{ "test": "test" }'
    }

    await httpTrigger(context, request)

    expect(context.res.status).toEqual(422)
    expect(context.res.body).toEqual(schemaErrors)
  })

  it('should return 200 for valid message', async () => {
    const request = {
      body: {
        $schema: './credit-order-schema.json',
        customer: {
          id: 'string',
          nationality: 'British',
          dateOfBirth: '2023-11-11'
        },
        developer: {
          id: 'string',
          other: 'other'
        },
        development: {
          localPlanningAuthority: {
            code: 'E60000090',
            name: 'Lincoln LPA'
          },
          planningReference: 'string',
          name: 'string'
        },
        purchaseOrderNumber: 'string',
        products: [
          {
            code: 'string',
            qty: 0.00
          },
          {
            code: 'string',
            qty: 0.00
          }
        ]
      }
    }

    await httpTrigger(context, request)

    expect(context.res.status).toEqual(200)
    expect(context.res.body).toEqual('Valid message received.')
  })
})
