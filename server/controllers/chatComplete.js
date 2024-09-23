const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const wildlifePrompt  = require('../prompts/wildlifePrompt');
const apiKey = process.env.CORCEL_API_KEY;


const chatComplete = async (req, res) => {
  const message = req.body.message;
  // console.log("message from frontend side", message);
  const url = 'https://api.corcel.io/v1/text/cortext/chat';
  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: apiKey,
    },
  };

  const data = {
    model: 'gpt-4o',
    stream: false,
    top_p: 1,
    temperature: 0.0001,
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content: wildlifePrompt,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  };

  try {
    const response = await axios.post(url, data, options);
    const content = response.data[0].choices[0].delta.content;
    res.status(200).send(content);
  } catch (error) {
    console.error(error);

    // Send the error response back to the client
    res
      .status(500)
      .json({error: 'An error occurred while generating the response'});
  }
};

module.exports=chatComplete
