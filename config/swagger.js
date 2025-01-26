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
      name: "Authentication",
      description: "APIs for authentication",
    },
    {
      name: "Users",
      description: "APIs related to user management",
    },
  ],
  paths: {
    // "/auth/login": {
    //   post: loginUser,
    // },
    // "/auth/logout": {
    //   post: logoutUser,
    // },
    // "/users": {
    //   post: createUser,
    //   get: getUsers,
    // },
    // "/users/{userId}": {
    //   get: getUser,
    //   put: updateUser,
    //   delete: deleteUser,
    // },
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
