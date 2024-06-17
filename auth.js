import axios from 'axios';

const CLIENT_ID = 'sr8r9448gpde383w0nhm0aqpelsvkp';
const CLIENT_SECRET = 'evx6w6243wsgjwxnp4vycxwsoicdbj';

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });
    console.log('token réussit')
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

export default getAccessToken;
