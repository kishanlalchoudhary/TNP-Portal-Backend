const createNotice = {
  tags: ["Notices"],
  description: "Create Notice",
  operationId: "CreateNotice",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "PhonePe Regsitration Drive",
            },
            description: {
              type: "string",
              example:
                "Submit your application before the deadline to avoid disqualification",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const getNotices = {
  tags: ["Notices"],
  description: "Get Notices",
  operationId: "GetNotices",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const deleteNotice = {
  tags: ["Notices"],
  description: "Delete Notice",
  operationId: "DeleteNotice",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Notice Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

module.exports = { createNotice, getNotices, deleteNotice };
