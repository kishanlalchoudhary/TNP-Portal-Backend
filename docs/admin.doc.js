const adminLogin = {
  tags: ["Admins"],
  description: "Login Admin",
  operationId: "LoginAdmin",
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
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              example: "JohnDoe",
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
  tags: ["Admins"],
  description: "Logout Admin",
  operationId: "LogoutAdmin",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const createAdmin = {
  tags: ["Admins"],
  description: "Create Admin",
  operationId: "CreateAdmin",
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
            first_name: {
              type: "string",
              example: "John",
            },
            last_name: {
              type: "string",
              example: "Doe",
            },
            email: {
              type: "string",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              example: "JohnDoe",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const deleteAdmin = {
  tags: ["Admins"],
  description: "Delete Admin",
  operationId: "DeleteAdmin",
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
      description: "Admin Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

module.exports = {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
};
