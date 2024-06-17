import axios from 'axios';
import getAccessToken from './auth';

const setupAPIClient = async () => {
  const ACCESS_TOKEN = await getAccessToken();
  const CLIENT_ID = 'sr8r9448gpde383w0nhm0aqpelsvkp';

  const api = axios.create({
    baseURL: 'https://api.igdb.com/v4/',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });

  return api;
};

export default setupAPIClient;
