/** @format */

const express = require("express");
const cors = require("cors"); // Importar correctamente el middleware cors
const OpenAI = require("openai");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Usar correctamente el middleware cors

const openai = new OpenAI({
  apiKey: "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",
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    console.log("Received message:", message);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo-0125",
    });
    const reply = completion.choices[0].message.content.trim();
    console.log("BOT RESPONSE:", reply);
    res.send(reply);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
