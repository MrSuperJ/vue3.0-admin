import axios from '@/utils/request.ts'

export function login (params: object) {
  return axios.post('/user/common/login/login', params)
}

export function getUserInfo (params: object) {
  return axios.post('/user/common/login/login', params)
}
