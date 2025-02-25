const addSkill = {
  tags: ["Skills"],
  description: "Add Skill",
  operationId: "AddSkill",
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
            name: {
              type: "string",
              example: "DBMS",
            },
            logo: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const getSkills = {
  tags: ["Skills"],
  description: "Get Skills",
  operationId: "GetSkills",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const removeSkill = {
  tags: ["Skills"],
  description: "Remove Skill",
  operationId: "RemoveSkill",
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
      description: "Skill Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const getQuestions = {
  tags: ["Skills"],
  description: "Get Questions",
  operationId: "GetQuestions",
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
      description: "Skill Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const evaluateAnswers = {
  tags: ["Skills"],
  description: "Evaluate Answers",
  operationId: "EvaluateAnswers",
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
      description: "Skill Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

module.exports = {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
};
