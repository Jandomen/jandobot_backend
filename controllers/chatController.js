const { OpenAI } = require("openai");

const chatWithHoraci = async (req, res) => {
  const { message, apiKey } = req.body;

  if (!apiKey) return res.status(401).json({ reply: "❌ Debes ingresar tu API Key." });

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ reply: "❌ Error al consultar a OpenAI." });
  }
};

module.exports = { chatWithHoraci };
