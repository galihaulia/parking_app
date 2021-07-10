'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getSchemaRequest =
  exports.getSchemaResponse =
  exports.succeesResponse =
    void 0
exports.succeesResponse = (res, data) => {
  return res.status(200).json({
    message: 'success',
    data,
  })
}
exports.getSchemaResponse = (title, schemaName, typeDataResp) => {
  title = typeDataResp === 'array' ? title + 's' : title
  const data =
    typeDataResp === 'array'
      ? {
          type: 'array',
          items: {
            $ref: '#/components/schemas/' + schemaName,
          },
        }
      : { $ref: '#/components/schemas/' + schemaName }
  return {
    type: 'object',
    title: title + '.Response',
    properties: {
      message: {
        type: 'string',
      },
      data,
    },
  }
}
exports.getSchemaRequest = (schemaName) => {
  return {
    $ref: '#/components/schemas/' + schemaName,
  }
}
//# sourceMappingURL=apiBuildHandler.js.map
