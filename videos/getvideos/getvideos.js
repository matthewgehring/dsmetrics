const axios = require('axios');

const handler = async (event) => {
  try {
    const response = await axios.get('https://www.dreamingspanish.com/.netlify/functions/videos', {
      headers: {
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // Note: use response.data to get the response body
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
