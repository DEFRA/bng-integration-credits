module.exports = {
  $schema: 'http://json-schema.org/schema',
  $id: 'https://biodiversitynetgain.naturalengland.gov.uk/credit.order.schema.json',
  title: 'Biodiversity Net Gain Credit Order',
  description: 'An individual order for one or more Biodiversity Net Gain credits. Multiple types of credits are supported in a single order. Information required to support the processing of the order, including anti-money laundering informtion is included.',
  type: 'object',
  properties: {
    customer: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        nationality: {
          description: 'The name of the nationality.',
          examples: [
            'British',
            'French',
            'Estonian',
            'American',
            'Indian',
            'Costa Rican'
          ],
          maxLength: 100,
          type: 'string'
        },
        dateOfBirth: {
          type: 'string',
          format: 'date'
        }
      },
      required: [
        'id',
        'nationality',
        'dateOfBirth'
      ]
    },
    organisation: {
      type: 'object',
      properties: {
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        },
        other: {
          type: 'string'
        }
      },
      required: [
        'id',
        'other'
      ]
    },
    development: {
      type: 'object',
      properties: {
        localPlanningAuthority: {
          description: 'The local planning authority which issued the planning reference.',
          type: 'object',
          properties: {
            code: {
              description: 'The code of the local planning authority',
              pattern: '^E60000[0-9]{3}$',
              examples: [
                'E60000090',
                'E60000094'
              ],
              type: 'string'
            },
            name: {
              description: 'The name of the local planning authority',
              maxLength: 255,
              examples: [
                'North West Leicestershire LPA',
                'Lincoln LPA'
              ],
              type: 'string'
            }
          },
          required: ['code', 'name']
        },
        planningReference: {
          description: 'The planning reference for the project as assigned by the local planning authority',
          maxLength: 255,
          type: 'string'
        },
        name: {
          description: 'A name for the development project as assigned by the developer',
          maxLength: 255,
          type: 'string'
        }
      },
      required: ['localPlanningAuthority', 'planningReference']
    },
    purchaseOrderNumber: {
      type: 'string'
    },
    products: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            qty: {
              type: 'number'
            }
          },
          required: [
            'code',
            'qty'
          ]
        },
        {
          type: 'object',
          properties: {
            code: {
              type: 'string'
            },
            qty: {
              type: 'number'
            }
          },
          required: [
            'code',
            'qty'
          ]
        }
      ]
    }
  },
  required: [
    'customer',
    'development',
    'purchaseOrderNumber',
    'products'
  ]
}
