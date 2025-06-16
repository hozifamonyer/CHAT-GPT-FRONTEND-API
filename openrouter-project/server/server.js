import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = 3000;

// وسط التطبيق (middleware) لازم لتحليل JSON
app.use(cors());
app.use(express.json()); // **هذا السطر مهم**
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/ask", async (req, res) => {
  try {
    // هنا استخرج السؤال من الجسم
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "يرجى إدخال السؤال." });
    }

    // طلب الذكاء الاصطناعي
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0].message.content;

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في السيرفر." });
  }
});

app.listen(port, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${port}`);
});
