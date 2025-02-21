const {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
} = require("../docs/admin.doc");
const {
  createJob,
  getJobs,
  getActiveJobs,
  getJob,
  deleteJob,
  applyToJob,
  appliedStudents,
  downloadAppliedStudentsCSV,
} = require("../docs/job.doc");
const {
  registerStudent,
  loginStudent,
  logoutStudent,
  getUnverifiedStudents,
  getVerifiedStudents,
  getStudent,
  verifyStudent,
  deleteStudent,
  getProfile,
  appliedJobs,
} = require("../docs/student.doc");

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
      name: "Jobs",
      description: "APIs related to job management",
    },
    {
      name: "Students",
      description: "APIs related to student management",
    },
  ],
  paths: {
    "/admins": {
      post: createAdmin,
    },
    "/admins/login": {
      post: adminLogin,
    },
    "/admins/logout": {
      post: adminLogout,
    },
    "/admins/{id}": {
      delete: deleteAdmin,
    },
    "/jobs": {
      post: createJob,
      get: getJobs,
    },
    "/jobs/active": {
      get: getActiveJobs,
    },
    "/jobs/{id}": {
      get: getJob,
      delete: deleteJob,
    },
    "/jobs/{id}/apply": {
      post: applyToJob,
    },
    "/jobs/{id}/applied-students": {
      get: appliedStudents,
    },
    "/jobs/{id}/applied-students/csv": {
      get: downloadAppliedStudentsCSV,
    },
    "/students": {
      post: registerStudent,
    },
    "/students/login": {
      post: loginStudent,
    },
    "/students/logout": {
      post: logoutStudent,
    },
    "/students/unverified": {
      get: getUnverifiedStudents,
    },
    "/students/verified": {
      get: getVerifiedStudents,
    },
    "/students/{id}": {
      get: getStudent,
      delete: deleteStudent,
    },
    "/students/{id}/verify": {
      post: verifyStudent,
    },
    "/students/me/profile": {
      get: getProfile,
    },
    "/students/me/applied-jobs": {
      get: appliedJobs,
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
