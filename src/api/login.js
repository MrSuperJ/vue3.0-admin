export default ($axios) => ({
  login: params => {
    return $axios.post('/user/common/login/login', params)
  }
})
