const carsDoc = require('./cars.docs')

const allDocs = [carsDoc.default]
let apiDoc = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'News App Api Documentation',
  },
  servers: [
    {
      url: '/api/v1',
    },
  ],
  // security: ["bearerAuth"],
  paths: {},
  components: {
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          statusesId: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
}
allDocs.forEach((doc) => {
  apiDoc.paths = Object.assign(Object.assign({}, apiDoc.paths), doc.paths)
  apiDoc.components.schemas = Object.assign(
    Object.assign({}, apiDoc.components.schemas),
    doc.schema,
  )
})
exports.default = () => {
  return apiDoc
}
