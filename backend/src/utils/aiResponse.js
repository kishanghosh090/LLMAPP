import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const apiRes = async (message) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "deepseek-chat",
  });
  console.log(completion.choices[0].message.content);
};

export { apiRes };
