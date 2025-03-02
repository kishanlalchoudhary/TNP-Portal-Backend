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

const createNotification = {
  tags: ["Notifications"],
  description: "Create Notification for Students",
  operationId: "CreateNotification",
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
              example: "Important Placement Update",
            },
            description: {
              type: "string",
              example: "New job opportunity from XYZ Company. Register by March 10th.",
            },
            studentIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["cm6lqlr0k0000vp0vzd0t3nzh", "cm6lqlr0k0001vp0vzd0t3nzi"],
            },
          },
          required: ["title", "description", "studentIds"],
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Notification created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Notification created successfully",
              },
              notification: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    example: "cm6lqlr0k0002vp0vzd0t3nzj",
                  },
                  title: {
                    type: "string",
                    example: "Important Placement Update",
                  },
                  description: {
                    type: "string",
                    example: "New job opportunity from XYZ Company. Register by March 10th.",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-03-02T12:00:00.000Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const deleteNotification = {
  tags: ["Notifications"],
  description: "Delete Notification",
  operationId: "DeleteNotification",
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
      description: "Notification Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0002vp0vzd0t3nzj",
      },
    },
  ],
  responses: {
    "200": {
      description: "Notification deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "Notification deleted successfully",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Notification not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Notification not found",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
  createNotification,
  deleteNotification,
};
