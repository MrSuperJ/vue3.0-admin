import axios from '@/utils/request.js'

export function login (params) {
  return axios.post('/user/common/login/login', params)
}
