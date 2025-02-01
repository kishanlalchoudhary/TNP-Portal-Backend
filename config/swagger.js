const { createAdmin, deleteAdmin } = require("../docs/admin.doc");
const { adminLogin, adminLogout } = require("../docs/auth.doc");

const documentation = {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "TNP Portal API",
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1",
      description: "Local Server",
    },
    {
      url: "https://tnp-portal-backend-tpx5.onrender.com/api/v1",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "Admins",
      description: "APIs related to admin management",
    },
    {
      name: "Authentication",
      description: "APIs related to authentication",
    },
  ],
  paths: {
    "/admins": {
      post: createAdmin,
    },
    "/admins/{id}": {
      delete: deleteAdmin,
    },
    "/auth/admin/login": {
      post: adminLogin,
    },
    "/auth/admin/logout": {
      post: adminLogout,
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

module.exports = documentation;
