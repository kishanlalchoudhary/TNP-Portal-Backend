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
              example:
                "I am encountering an issue when trying to log in to the Goggle OA portal. The page keeps loading endlessly, and I am unable to access the test page. I’ve tried using different browsers, clearing my browser cache, and even changing networks, but the issue remains.",
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
