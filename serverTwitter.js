const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

app.post('/twitter-details', async (req, res) => {
  const { username, user_id } = req.body;

  const options = {
    method: 'POST',
    url: 'https://twitter154.p.rapidapi.com/user/details',
    headers: {
      'content-type': 'application/json',
      'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
      'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
      'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
    },
    data: {
      username: username,
      user_id: user_id
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
