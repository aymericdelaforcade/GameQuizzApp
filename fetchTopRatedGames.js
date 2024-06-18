import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CLIENT_ID = 'sr8r9448gpde383w0nhm0aqpelsvkp';
const CLIENT_SECRET = 'evx6w6243wsgjwxnp4vycxwsoicdbj';
const CACHE_KEY = 'topRatedGames';
const CACHE_DURATION = 10; // 1 heure en millisecondes

let accessToken = '';

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });
    accessToken = response.data.access_token;
    console.log('Access token obtained:', accessToken);
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const setupAPIClient = async () => {
  if (!accessToken) {
    await getAccessToken();
  }
  return axios.create({
    baseURL: 'https://api.igdb.com/v4/',
    headers: {
      'Client-ID': CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`,
    },
  });
};

const fetchMostPopularGames = async () => {
  const CACHE_KEY_POPULAR = 'mostPopularGames';
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY_POPULAR);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();
      if (now - timestamp < CACHE_DURATION) {
        console.log('Returning cached data');
        return data;
      }
    }

    const api = await setupAPIClient();
    console.log('Making API request for popular games');
    const response = await api.post('games', 'fields name, release_dates.y, alternative_names.name, genres.name,involved_companies.company.name, involved_companies.company.parent.name, screenshots.image_id; sort total_rating_count desc; limit 200;');


    //console.log('API response received:', response.data);
    const cacheData = {
      data: response.data,
      timestamp: new Date().getTime(),
    };
    await AsyncStorage.setItem(CACHE_KEY_POPULAR, JSON.stringify(cacheData));

    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default fetchMostPopularGames;
