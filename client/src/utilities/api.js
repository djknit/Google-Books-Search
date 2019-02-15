import axios from 'axios'

function createApiCall(subRoute) {
  const api = axios.create({
    baseURL: `/api/${subRoute}`
  });
  return api;
}

const authApi = createApiCall('auth');

export default {
  auth: {
    createAccount: newUser => authApi.post('/create', newUser),
    login: (usernameOrEmail, password) => authApi.post('/login', { usernameOrEmail, password }),
    logout: () => authApi.post('/logout'),
    test: () => authApi.get('/test'),
    forgotPassword: email => authApi.post('/forgotpassword', { email }),
    resetPassword: (token, newPassword) => authApi.post('/resetpassword/', { token, newPassword })
  }
}