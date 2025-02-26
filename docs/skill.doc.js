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
        example: "cm7knwwch00022r0wzf995i0b",
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
        example: "cm7knwwch00022r0wzf995i0b",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                  difficulty: { type: "string" },
                },
                required: ["question", "answer", "difficulty"],
              },
            },
          },
          example: {
            questions: [
              {
                question:
                  "What is a database, and why is it preferred over using simple files like spreadsheets?",
                answer:
                  "A database is a structured way of storing and managing data that allows for efficient retrieval and updates. Unlike spreadsheets, databases can handle large datasets without performance degradation, support multi-user access, and enforce data integrity. They also provide better security and advanced querying capabilities, making them ideal for complex applications.",
                difficulty: "easy",
              },
              {
                question:
                  "Explain the difference between a primary key and a foreign key. Provide an example.",
                answer:
                  "A primary key uniquely identifies each record in a table, ensuring data consistency. A foreign key is a field that creates a relationship between two tables by referencing the primary key in another table.\n\nFor instance, in a student database, the 'Students' table may have 'Student_ID' as the primary key. The 'Enrollments' table can use 'Student_ID' as a foreign key to associate students with courses they have registered for.",
                difficulty: "easy",
              },
              {
                question:
                  "What is SQL? Provide an example query to retrieve all data from a 'Customers' table.",
                answer:
                  "SQL (Structured Query Language) is used to interact with databases by performing operations like retrieval, insertion, and deletion of data.\n\nA simple query to fetch all records from a table named 'Customers' is:\n\n```sql\nSELECT * FROM Customers;\n```\n\nThis command retrieves all columns and rows present in the 'Customers' table.",
                difficulty: "easy",
              },
              {
                question:
                  "Why is database normalization important? What problems does it help solve?",
                answer:
                  "Normalization is the process of structuring a database to reduce redundancy and improve integrity. It prevents issues like update anomalies and data duplication.\n\nFor example, if customer addresses are stored in multiple tables, changing an address in one location but not the others can lead to inconsistencies. Normalization ensures data is logically separated across tables to avoid such problems.",
                difficulty: "medium",
              },
              {
                question:
                  "What are ACID properties in database transactions? Briefly explain each one.",
                answer:
                  "ACID properties ensure database transactions are reliable:\n\n1. **Atomicity** – A transaction is completed fully or not at all.\n2. **Consistency** – The database remains in a valid state before and after transactions.\n3. **Isolation** – Transactions do not interfere with each other.\n4. **Durability** – Once committed, changes remain permanent.\n\nFor example, in banking, transferring money between accounts follows ACID principles to maintain accuracy and reliability.",
                difficulty: "medium",
              },
              {
                question:
                  "What is the difference between 'DELETE' and 'TRUNCATE' in SQL? Which one is faster?",
                answer:
                  "'DELETE' removes records based on a condition and logs each deletion, allowing rollback. 'TRUNCATE' removes all rows instantly without logging individual deletions, making it faster.\n\nFor instance:\n\n```sql\nDELETE FROM Users; -- Removes records one by one, can be rolled back.\nTRUNCATE TABLE Users; -- Deletes all records instantly, usually irreversible.\n```\n\nSince 'TRUNCATE' deallocates storage in bulk rather than row by row, it is more efficient than 'DELETE.'",
                difficulty: "hard",
              },
            ],
          },
        },
      },
    },
  },
  responses: {},
};

module.exports = {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
};
