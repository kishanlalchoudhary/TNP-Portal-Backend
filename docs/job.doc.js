const createJob = {
  tags: ["Jobs"],
  description: "Create Job",
  operationId: "CreateJob",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            company_name: {
              type: "string",
              example: "Google",
            },
            company_desc: {
              type: "string",
              example: "A multinational technology company.",
            },
            company_website_url: {
              type: "string",
              example: "https://www.google.com/",
            },
            job_role: {
              type: "string",
              example: "Software Engineer",
            },
            job_location: {
              type: "string",
              example: "Mountain View, CA",
            },
            selection_process: {
              type: "string",
              example: "Online Assessment, Technical Interview, HR Interview",
            },
            company_logo: {
              type: "string",
              format: "binary",
            },
            company_jd: {
              type: "string",
              format: "binary",
            },
            company_package: {
              type: "number",
              example: 12.5,
            },
            dream_company: {
              type: "string",
              enum: ["Yes", "No"],
              example: "Yes",
            },
            eligible_branches: {
              type: "array",
              items: { type: "string" },
              example: ["CE", "IT", "ENTC"],
            },
            cgpa: {
              type: "number",
              example: 8.5,
              minimum: -1,
              maximum: 10,
            },
            automata_score: {
              type: "number",
              example: 75.0,
              minimum: -1,
              maximum: 100,
            },
            elq_score: {
              type: "number",
              example: 80.0,
              minimum: -1,
              maximum: 100,
            },
            percentage_10th: {
              type: "number",
              example: 85.0,
              minimum: -1,
              maximum: 100,
            },
            percentage_12th: {
              type: "number",
              example: 88.0,
              minimum: -1,
              maximum: 100,
            },
            percentage_diploma: {
              type: "number",
              example: 88.0,
              minimum: -1,
              maximum: 100,
            },
            active_backlogs: { type: "integer", example: 0 },
            passive_backlogs: { type: "integer", example: 0 },
            application_deadline: {
              type: "string",
              format: "date-time",
              example: "2025-03-01T23:59:59.999Z",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const getJobs = {
  tags: ["Jobs"],
  description: "Get Jobs",
  operationId: "GetJobs",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getActiveJobs = {
  tags: ["Jobs"],
  description: "Get Active Jobs",
  operationId: "GetActiveJobs",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getInactiveJobs = {
  tags: ["Jobs"],
  description: "Get Inctive Jobs",
  operationId: "GetInactiveJobs",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getJob = {
  tags: ["Jobs"],
  description: "Get Job",
  operationId: "GetJob",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const deleteJob = {
  tags: ["Jobs"],
  description: "Delete Job",
  operationId: "DeleteJob",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const applyToJob = {
  tags: ["Jobs"],
  description: "Apply To job",
  operationId: "ApplyToJob",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const appliedStudents = {
  tags: ["Jobs"],
  description: "Applied Students",
  operationId: "AppliedStudents",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const downloadAppliedStudentsCSV = {
  tags: ["Jobs"],
  description: "Download Applied Students CSV",
  operationId: "DownloadAppliedStudentsCSV",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const markShortlisted = {
  tags: ["Jobs"],
  description: "Mark Shortlisted",
  operationId: "MarkShortlisted",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "cm7kotjvp0003xe0whhmtd7nl",
                "cm84ofmj60002yl0vklrq9cra",
              ],
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const unmarkShortlisted = {
  tags: ["Jobs"],
  description: "unmark Shortlisted",
  operationId: "UnmarkShortlisted",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "cm7kotjvp0003xe0whhmtd7nl",
                "cm84ofmj60002yl0vklrq9cra",
              ],
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const shortlistedStudents = {
  tags: ["Jobs"],
  description: "Shortlisted Students",
  operationId: "ShortlistedStudents",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const markPlaced = {
  tags: ["Jobs"],
  description: "Mark Placed",
  operationId: "MarkPlaced",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "cm7kotjvp0003xe0whhmtd7nl",
                "cm84ofmj60002yl0vklrq9cra",
              ],
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const unmarkPlaced = {
  tags: ["Jobs"],
  description: "Unmark Placed",
  operationId: "UnmarkPlaced",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentIds: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "cm7kotjvp0003xe0whhmtd7nl",
                "cm84ofmj60002yl0vklrq9cra",
              ],
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const placedStudents = {
  tags: ["Jobs"],
  description: "Placed Students",
  operationId: "PlacedStudents",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const shortlistedResults = {
  tags: ["Jobs"],
  description: "Shortlisted Results",
  operationId: "ShortlistedResults",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const placedResults = {
  tags: ["Jobs"],
  description: "Placed Results",
  operationId: "PlacedResults",
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
      description: "Job Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

module.exports = {
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
};
