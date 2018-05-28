import fetch from './fetch';

export default {
  // 咨询列表
  insert(params) {
    return fetch.post('/article', params)
  },
}
