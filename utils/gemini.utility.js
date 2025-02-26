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
    - 3 medium questions.

    These questions should be:
    - Suitable for a fresher-level interview.
    - Relevant to real-world applications.
    - Commonly asked in technical interviews.
    - Concise, clear, and unambiguous.
    - Answerable within a maximum of 250 words.

    ### **Output Format Requirement:**
    Strictly return a valid JSON object with a key **"questions"**, containing an array of question objects. Each object should have exactly one key: **"question"**, with a string value representing the interview question.

    #### **Example Output:**
    \`\`\`json
    {
      "questions": [
        { "question": "Question 1" },
        { "question": "Question 2" },
        { "question": "Question 3" },
        { "question": "Question 4" },
        { "question": "Question 5" },
        { "question": "Question 6" }
      ]
    }
    \`\`\`

    **Important:**  
    - Do not include any additional text, explanations, or formatting outside the JSON object.  
    - Ensure that the JSON output is correctly formatted and parseable.  
    `;

    const response = await model.invoke(prompt);
    const json = convertToJSON(response);
    return json.questions;
  } catch (error) {
    throw error;
  }
};

module.exports = { getQuestionsFromGemini };
