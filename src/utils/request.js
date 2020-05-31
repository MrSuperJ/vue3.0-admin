import axios from 'axios'
import { getToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import router from '@/router'
const service = axios.create({
  // baseURL: '/jeecg-boot',
  baseURL: '/api', // api base_url
  timeout: 9000 // 请求超时时间
})

// 请求发起前
service.interceptors.request.use(config => {
  config.headers.userToken = getToken()
  return config
})
// 拿到数据后
service.interceptors.response.use(res => {
  const { data: { code, data, msg } } = res
  if (code === 200) {
    return data
  } else if (code === 302) {
    debugger
    router.push({
      name: 'login'
    })
  } else {
    message.error((data && data[0] && data[0].message) || msg || 'Error')
  }
})

export default service
