const adminLogin = {
  tags: ["Admins"],
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
  operationId: "createAdmin",
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
              example: "Kishanlal",
            },
            last_name: {
              type: "string",
              example: "Choudhary",
            },
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

const deleteAdmin = {
  tags: ["Admins"],
  description: "Delete Admin",
  operationId: "deleteAdmin",
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
