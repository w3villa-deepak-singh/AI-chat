const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');
const apiKey = process.env.CORCEL_API_KEY;

const imageGenerator = async (req, res) => {
  const prompt = req.body.prompt;
  console.log("prompt receive from fronted", prompt);
  const url = "https://api.corcel.io/v1/image/cortext/text-to-image";
  const options = {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: apiKey
    }
  };

  const data = {
    messages: prompt,
    model: "cortext-image",
    size: "1024x1024",
    quality: "standard",
    provider: "OpenAI",
    steps: 30,
    cfg_scale: 8
  };

  try {
    // Await the response from axios
    const response = await axios.post(url, data, options);
    // Send the JSON response back to the client
    res.status(200).json(response.data[0]); // This will send the image URL and other details from the API response.
  } catch (error) {
    console.error(error);

    // Send the error response back to the client
    res.status(500).json({ error: 'An error occurred while generating the image' });
  }
};

module.exports = imageGenerator;
