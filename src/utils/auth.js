// axios
import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'c3e422a2ea4fbce1b97cbebce6616f71',
  },
});
// step #1: fetch token
export async function fetchToken() {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
    //
  } catch (error) {
    console.log('Sorry, your token could not be created');
  }
}

// step #2: create session ID
export async function createSessionId() {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const {
        data: { session_id },
      } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });

      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
}
