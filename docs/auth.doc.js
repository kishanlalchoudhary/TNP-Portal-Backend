const adminLogin = {
  tags: ["Authentication"],
  description: "Login Admin",
  operationId: "loginAdmin",
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
            email: {
              type: "string",
              example: "kisanchoudhary000@gmail.com",
            },
            password: {
              type: "string",
              example: "kishanlalchoudhary",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const adminLogout = {
  tags: ["Authentication"],
  description: "Logout Admin",
  operationId: "LogoutAdmin",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

module.exports = {
  adminLogin,
  adminLogout,
};
