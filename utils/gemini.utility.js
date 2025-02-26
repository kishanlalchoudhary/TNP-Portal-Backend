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

    ### Output Format Requirement:
    Strictly return a valid JSON object with a key "questions", containing an array of question objects.

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
    const prompt = `You are an AI expert in technical topics such as OOPs, DSA, and programming concepts.
    Also, you are an expert HR that can validate personality Development questions too.

    - A rating (1 to 10) based on how well are the answers provided in the input.
    - The correct answer for each question.
    - Plagiarism check as a percentage (0 to 100) based on the user's provided answer.
    - Feedback on each question’s clarity, conciseness, and relevance.

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
    - plagiarism: plagiarism percentage (0 to 100).

    Additionally, return:
    - overall_rating: an average rating across all questions.
    - topics_to_improve: any topics or areas the candidate could focus on to improve.

    #### Example Input:
    \`\`\`json
    {
      "questions": ${questions}
    }
    \`\`\`

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
          "plagiarism": 0
        }
      ],
      "overall_rating": 8.5,
      "topics_to_improve": ["Database Normalization", "ACID Properties"]
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

module.exports = { getQuestionsFromGemini, evaluateQuestionsFromGemini };
