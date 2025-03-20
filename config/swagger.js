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
  getInactiveJobs,
  getJob,
  deleteJob,
  applyToJob,
  appliedStudents,
  downloadAppliedStudentsCSV,
  markShortlisted,
  unmarkShortlisted,
  shortlistedStudents,
  markPlaced,
  unmarkPlaced,
  placedStudents,
  shortlistedResults,
  placedResults,
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
const {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
} = require("../docs/skill.doc");
const {
  raiseQuery,
  getQueries,
  getSummaryOfQueries,
  deleteQuery,
  replyQuery,
} = require("../docs/query.doc");
const {
  createNotice,
  getNotices,
  deleteNotice,
} = require("../docs/notice.doc");
const {
  createUser,
  getUsers,
  loginAndGetUser,
  deleteUser,
} = require("../docs/user.doc");

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
    {
      name: "Skills",
      description: "APIs related to skill management",
    },
    {
      name: "Queries",
      description: "APIs related to help and support query management",
    },
    {
      name: "Notices",
      description: "APIs related to notice management",
    },
    {
      name: "Users",
      description: "APIs related to user management",
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
    "/jobs/inactive": {
      get: getInactiveJobs,
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
    "/jobs/{id}/mark-shortlisted": {
      post: markShortlisted,
    },
    "/jobs/{id}/unmark-shortlisted": {
      post: unmarkShortlisted,
    },
    "/jobs/{id}/shortlisted-students": {
      get: shortlistedStudents,
    },
    "/jobs/{id}/mark-placed": {
      post: markPlaced,
    },
    "/jobs/{id}/unmark-placed": {
      post: unmarkPlaced,
    },
    "/jobs/{id}/placed-students": {
      get: placedStudents,
    },
    "/jobs/{id}/shortlisted-results": {
      get: shortlistedResults,
    },
    "/jobs/{id}/placed-results": {
      get: placedResults,
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
    "/skills": {
      post: addSkill,
      get: getSkills,
    },
    "/skills/{id}": {
      delete: removeSkill,
    },
    "/skills/{id}/questions": {
      get: getQuestions,
    },
    "/skills/{id}/evaluations": {
      post: evaluateAnswers,
    },
    "/queries": {
      post: raiseQuery,
      get: getQueries,
    },
    "/queries/summary": {
      get: getSummaryOfQueries,
    },
    "/queries/{id}": {
      delete: deleteQuery,
    },
    "/queries/{id}/reply": {
      post: replyQuery,
    },
    "/notices": {
      post: createNotice,
      get: getNotices,
    },
    "/notices/{id}": {
      delete: deleteNotice,
    },
    "/users": {
      post: createUser,
      get: getUsers,
    },
    "/users/login-and-get-user": {
      post: loginAndGetUser,
    },
    "/users/{id}": {
      delete: deleteUser,
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
