import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.onesignal.com/notifications?c=push',
  headers: {
    Authorization: 'Key fe6tirdm7ero5ao3cpnffgjiu'
  }
})

export { api }