const {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
} = require("../docs/admin.doc");
const { createJob, getJobs, getJob, deleteJob } = require("../docs/job.doc");

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
    {
      name: "Jobs",
      description: "APIs related to job management",
    },
  ],
  paths: {
    "/admins/login": {
      post: adminLogin,
    },
    "/admins/logout": {
      post: adminLogout,
    },
    "/admins": {
      post: createAdmin,
    },
    "/admins/{id}": {
      delete: deleteAdmin,
    },
    "/jobs": {
      post: createJob,
      get: getJobs,
    },
    "/jobs/{id}": {
      get: getJob,
      delete: deleteJob,
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
