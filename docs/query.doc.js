const raiseQuery = {
  tags: ["Queries"],
  description: "Raise Query",
  operationId: "RaiseQuery",
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
            description: {
              type: "string",
              example: "John",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const getQueries = {
  tags: ["Queries"],
  description: "Get Queries",
  operationId: "GetQueries",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getSummaryOfQueries = {
  tags: ["Queries"],
  description: "Get Summary Of Queries",
  operationId: "GetSummaryOfQueries",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const deleteQuery = {
  tags: ["Queries"],
  description: "Delete Query",
  operationId: "DeleteQuery",
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
      description: "Query Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

module.exports = {
  raiseQuery,
  getQueries,
  getSummaryOfQueries,
  deleteQuery,
};
