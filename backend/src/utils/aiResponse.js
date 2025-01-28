import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";
const apiRes = async (text) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = text;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

export { apiRes };
