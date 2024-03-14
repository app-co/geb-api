import axios from 'axios';

export const apiOnesignal = axios.create({
  baseURL: 'https://onesignal.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.ONE_SIGNAL_KEY}`,
  },
});
