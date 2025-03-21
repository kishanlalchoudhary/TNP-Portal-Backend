const model = require("../config/gemini");

const convertToJSON = (response) => {
  const jsonMatch = response.content.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  } else {
    console.error(jsonMatch);
    throw new Error("Invalid JSON output received");
  }
};

const getQuestionsFromGemini = async (skill) => {
  try {
    const prompt = `You are an AI that generates interview questions. Generate exactly 6 interview questions on ${skill.name}, categorized as follows:
    - 3 easy questions.
    - 2 medium questions.
    - 1 hard question.

    These questions should be:
    - Suitable for a fresher-level interview.
    - Relevant to real-world applications.
    - Commonly asked in technical interviews.
    - Concise, clear, and unambiguous.
    - Answerable within a maximum of 250 words.
    - Ensure questions are **randomized** and **unique** on every execution.
    - Vary the phrasing and structure each time the prompt is used.

    ### Output Format Requirement:
    Strictly return a valid JSON object with a key "questions", containing an array of objects having keys question and difficulty.

    #### Example Output:
    \`\`\`json
    {
      "questions": [
        { "question": "Question 1", "difficulty": "easy"},
        { "question": "Question 2", "difficulty": "easy"},
        { "question": "Question 3", "difficulty": "easy"},
        { "question": "Question 4", "difficulty": "medium"},
        { "question": "Question 5", "difficulty": "medium"},
        { "question": "Question 6", "difficulty": "hard"}
      ]
    }
    \`\`\`

    Important: 
    - Do not include any additional text, explanations, or formatting outside the JSON object.
    - Ensure that the generated questions are different every time by using varied scenarios and random selection.  
    - Ensure that the JSON output is correctly formatted and parseable.  
    `;

    const response = await model.invoke(prompt);
    return convertToJSON(response);
  } catch (error) {
    throw error;
  }
};

const evaluateQuestionsFromGemini = async (skill, questions) => {
  try {
    const prompt = `You are an AI that evaluates candidate responses in ${skill.name} interviews. 
    
    ### Task:
    Given a list of questions, responses, and difficulty levels, your task is to assess the accuracy, completeness, and relevance of each answer and provide structured feedback.

    ### Evaluation Criteria:  
    For each response, compare it against the correct answer and assign a rating based on the following scale:  
    - 10: Fully correct, complete, and well-explained.  
    - 7-9: Mostly correct, with minor missing details or slight inaccuracies.  
    - 4-6: Partially correct but missing key concepts or explanations.  
    - 1-3: Largely incorrect, vague, or containing misconceptions.  
    - 0: Completely incorrect, unrelated, or blank.  

    ### Input Format:
    Provide the "questions" key, containing an array of question objects. Each object contains:
    - question: the interview question.
    - answer: the answer provided by the user.
    - difficulty: the difficulty level (easy, medium, or hard).

    ### Output Format Requirement:
    Strictly return a valid JSON object with a key "evaluations", containing an array of evaluation objects. Each object should have:
    - question: the interview question.
    - correct_answer: the correct answer to the question.
    - rating: rating (1 to 10).
    - plagiarism: contains combined score that includes both AI generation likelihood and plagiarism percentage. It represents the percentage (0 to 100) indicating how much the answer matches AI-generated content and/or existing sources.

    Additionally, return:
    - overall_rating: an average rating across all questions.
    - topics_to_improve: any topics or areas the candidate could focus on to improve.
    
    #### Example Output:
    \`\`\`json
    {
      "evaluations": [
        {
          "question": "What is a database, and why is it important for storing data compared to using simple files like Excel spreadsheets?",
          "correct_answer": "A database is a structured way to store and manage data, making it easier to organize, retrieve, and update information efficiently. Unlike Excel spreadsheets, databases handle large amounts of data without performance issues, support multiple users accessing data simultaneously, and ensure data integrity. They also allow for complex queries and better security, which is crucial for applications handling sensitive information.",
          "rating": 9,
          "plagiarism": 0
        },
        {
          "question": "Explain the difference between a primary key and a foreign key. Provide a real-world example.",
          "correct_answer": "A primary key is a unique identifier for each record in a table, ensuring that no two rows have the same value for that key. A foreign key, on the other hand, is a field in one table that links to the primary key of another table, establishing a relationship between them. For example, in a library system, the 'Books' table may have a 'Book_ID' as the primary key. In the 'Borrowed_Books' table, the 'Book_ID' can act as a foreign key, referencing the 'Books' table to track which books are borrowed by which students.",
          "rating": 8,
          "plagiarism": 5
        }
      ],
      "overall_rating": 8.5,
      "topics_to_improve": ["Database Normalization", "ACID Properties"]
    }
    \`\`\`
    
    #### Input:
    \`\`\`json
    {
      "questions": ${JSON.stringify(questions, null, 2)}
    }
    \`\`\`


    Important:
    - Do not include any additional text or explanations outside the JSON object.
    - Ensure that the JSON output is correctly formatted and parseable.
    `;

    const response = await model.invoke(prompt);
    return convertToJSON(response);
  } catch (error) {
    throw error;
  }
};

const getSummaryOfQueriesFromGemini = async (queries) => {
  try {
    const prompt = `You are an AI that summarizes help and support queries.
    
    ### Task:
    Given a list of help and support queries, generate a summary in paragraph format (50-100 words).

    ### Output Format Requirement:
    Return a valid JSON object containing:
    - "summary": A paragraph (50-100 words) summarizing the queries.

    #### Example Output:
    \`\`\`json
    {
      "summary": "Several students are experiencing technical difficulties during the Goggle OA, impacting their ability to complete the test. A recurring issue involves login problems, where students face endless loading screens when attempting to access the portal, despite trying different browsers and networks. Lag in the coding editor is another prevalent concern, with students reporting delays in typing and clicking, hindering their coding progress. Some students are unable to start the coding portion of the test, encountering a blank screen upon clicking 'Start Test'. Furthermore, display issues, such as corrupted question formats with multiple-choice options appearing as a single string, are affecting test completion. Timer malfunctions, where the countdown doesn't update in real-time, add to the confusion. Browser-specific rendering problems, particularly in Chrome, are also reported."
    }
    \`\`\`

    #### Input:
    \`\`\`json
    {
      "queries": ${JSON.stringify(queries, null, 2)}
    }
    \`\`\`

    Important:
    - Do not include any additional text or explanations outside the JSON object.
    - Ensure that the JSON output is correctly formatted and parseable.
    `;

    const response = await model.invoke(prompt);
    return convertToJSON(response);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getQuestionsFromGemini,
  evaluateQuestionsFromGemini,
  getSummaryOfQueriesFromGemini,
};
