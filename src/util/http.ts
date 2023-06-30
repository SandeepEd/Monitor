import axios from 'axios';

const client = axios.create({
  baseURL: `/api`,
  withCredentials: true,
  headers: {
    "Content-Type": `application/json`,
    "credentials": `include`,
  },
  auth: {
    username: 'admin',
    password: 't3st1u1999'
  },
});

export default client;
