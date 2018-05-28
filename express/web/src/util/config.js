import axios from 'axios';

let util = {};

const ajaxUrl = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3000/api'
  : 'http://api.club.cn'

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

util.api = ajaxUrl
util.oauthUrl = ajaxUrl


export default util;
