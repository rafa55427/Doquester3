const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message, mode } = req.body;

  const systemPrompt = mode === 'desqueter'
    ? 'Você é DESQUETER, enigmático, direto, estilo GPT-6.'
    : 'Você é EQUESTER, uma IA precisa, séria, veloz e extremamente inteligente.';

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ]
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Erro interno ao processar a IA.' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});