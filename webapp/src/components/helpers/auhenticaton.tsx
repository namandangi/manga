import axios from 'axios';
import Cookies from 'js-cookie';

async function login(username: String, password: String) {
  axios
    .post(process.env.API_URL + '/api/mangas/user/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.status === 201) {
        const { token } = response.data;
        const { username } = response.data.user;
        Cookies.set('token', token);
        Cookies.set('username', username);
        console.log(token);
      }
      return response.status;
    });
}

async function register(username: String, password: String) {
  axios
    .post(process.env.API_URL + '/api/mangas/user/register', {
      username,
      password,
    })
    .then((response) => {
      if (response.status === 201) {
        const { token } = response.data;
        const { username } = response.data.user;
        Cookies.set('token', token);
        Cookies.set('username', username);
        console.log(response);
      }
      return response.status;
    });
}

export { login, register };
