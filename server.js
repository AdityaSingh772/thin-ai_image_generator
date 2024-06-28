
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/generate', (req, res) => {
  const { prompt } = req.body;
  const token = process.env.HUGGING_API;

  if (!prompt || !token) {
    return res.status(400).json({ error: 'Prompt and token are required' });
  }

  const command = `python generate_image.py "${token}" "${prompt}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    const imagePath = stdout.trim();
    res.sendFile(path.resolve(imagePath));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
