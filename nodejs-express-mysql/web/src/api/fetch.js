import Util from '../util/config'
import qs from 'qs'

Util.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

Util.ajax.interceptors.request.use(config => {
  return config

}, error => {
  return Promise.reject(error)
});

Util.ajax.interceptors.response.use(response => {
  return response;

}, error => {
  let response = error.response;
  return Promise.reject(response)

});

export default {
  post(url, data) {

    return Util.ajax({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  get(url, params) {
    return Util.ajax({
      method: 'get',
      url: url,
      params,
    })
  },

  delete(url, params) {
    return Util.ajax({
      method: 'delete',
      url: url,
      params
    })
  },

  put(url, data) {

    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  }
}
