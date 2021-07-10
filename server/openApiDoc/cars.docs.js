const util = require('../utils/apiBuildHandler')
// const moment = require('moment');
const tag = 'UserController'
const schema = {
  tiketCreation: {
    title: 'vehicle registration',
    type: 'object',
    properties: {
      plat_nomor: {
        type: 'string',
      },
      warna: {
        type: 'string',
      },
      tipe: {
        type: 'string',
      },
    },
  },
  carOut: {
    title: 'car out',
    type: 'object',
    properties: {
      plat_nomor: {
        type: 'string',
      },
      tanggal_masuk: {
        type: 'string',
      },
      tanggal_keluar: {
        type: 'string',
      },
      jumlah_bayar: {
        type: 'string',
      },
    },
  },
}
const paths = {
  '/car-enter': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util.getSchemaRequest('tiketCreation'),
          },
        },
      },
      responses: {
        200: {
          description: 'vehicle registration',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/car-out': {
    get: {
      tags: [tag],
      parameters: [
        {
          name: 'plat_nomor',
          in: 'query',
          description: 'B 123 AB, B 123 BG, B 123 BH',
          schema: {
            type: 'string',
          },
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'car out',
          content: {
            'application/json': {
              schema: util.getSchemaResponse('carOut', 'carOut', 'object'),
            },
          },
        },
      },
    },
  },
  '/list-car': {
    get: {
      tags: [tag],
      parameters: [
        {
          name: 'warna',
          in: 'query',
          description: 'Hitam, Merah, Kuning',
          schema: {
            type: 'string',
          },
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'car out',
          content: {
            'application/json': {
              schema: util.getSchemaResponse('carOut', 'carOut', 'object'),
            },
          },
        },
      },
    },
  },
  '/report-car': {
    get: {
      tags: [tag],
      parameters: [
        {
          name: 'tipe',
          in: 'query',
          description: 'SUV, MPV',
          schema: {
            type: 'string',
          },
          required: true,
        },
      ],
      responses: {
        200: {
          description: 'car out',
          content: {
            'application/json': {
              schema: util.getSchemaResponse('carOut', 'carOut', 'object'),
            },
          },
        },
      },
    },
  },
}

exports.default = { schema, paths }
