// // services/openaiService.js
// const { Configuration, OpenAIApi } = require("openai");
// const dotenv = require("dotenv");
// const path = require("path");
// //dotenv.config();

// //dotenv.config({ path: "../.env" });
// dotenv.config({ path: path.resolve(__dirname, "../../.env.example") });
// // console.log("Loaded API Key:", process.env.API_KEY); 
// // Check if API_KEY is loaded
// if (!process.env.API_KEY) {
//   console.error("❌ Error: API_KEY is undefined. Make sure your .env file is correctly loaded.");
//   process.exit(1); // Exit the process to avoid unnecessary API calls
// } else {
//   console.log("✅ API Key Loaded Successfully");
// }

// const apiKey = process.env.API_KEY;
// const configuration = new Configuration({
//   apiKey: apiKey,
// });
// const openai = new OpenAIApi(configuration);

// async function callGPT(promptContent, systemContent, previousChat) {
//   try {
//     const messages = [];

//     const userPrompt = {
//       role: "user",
//       content: promptContent,
//     };
//     const systemPrompt = {
//       role: "system",
//       content: systemContent,
//     };
//     const assistantPrompt = {
//       role: "assistant",
//       content: previousChat,
//     };

//     messages.push(userPrompt);
//     messages.push(systemPrompt);
//     messages.push(assistantPrompt);

//     const response = await openai.createChatCompletion({
//       model: "gpt-4", // Switch to different models if necessary
//       //model: "gpt-3.5-turbo",
//       messages: messages,
//     });

//     console.log(1);
//     console.log(response.data.choices[0].message.content);
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error:", error);
//     return `An error occurred while processing the request: ${error}`;
//   }
// }

// module.exports = { callGPT };



const OpenAI = require("openai"); // Use 'OpenAI' instead of '{ Configuration, OpenAIApi }'
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env.example") });

if (!process.env.API_KEY) {
  console.error("❌ Error: API_KEY is undefined. Make sure your .env file is correctly loaded.");
  process.exit(1);
} else {
  console.log("✅ API Key Loaded Successfully");
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: promptContent },
    ];

    if (previousChat) {
      messages.push({ role: "assistant", content: previousChat });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Change to "gpt-3.5-turbo" if needed
      messages: messages,
      max_tokens: 1000,
      
    });

    console.log("AI Response:", response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    return `An error occurred while processing the request: ${error}`;
  }
}

module.exports = { callGPT };
