import axios from 'axios';

const client = axios.create({
  baseURL: `http://admin:t3st1u1999@129.79.38.39/Monarch/syncconnect/sdk.aspx`,
  withCredentials: true,
  headers: {
    "Content-Type": `application/json`,
    "credentials": `include`,
  },
});

export default client;
