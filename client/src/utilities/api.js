import axios from 'axios'

function createApiCall(subRoute) {
  const api = axios.create({
    baseURL: `/api/${subRoute}`
  });
  return api;
}

const authApi = createApiCall('auth');
const searchApi = createApiCall('search');
const savedApi = createApiCall('saved');

export default {
  auth: {
    createAccount: newUser => authApi.post('/create', newUser),
    login: (usernameOrEmail, password) => authApi.post('/login', { usernameOrEmail, password }),
    logout: () => authApi.post('/logout'),
    updatePrivacySettings: newSettings => authApi.post('/privacy-settings', newSettings),
    test: () => authApi.get('/test'),
    forgotPassword: email => authApi.post('/forgotpassword', { email }),
    resetPassword: (token, newPassword) => authApi.post('/resetpassword', { token, newPassword })
  },
  search: {
    submitSearch: query => searchApi.get(`/${query}`)
  },
  saved: {
    checkSavedStatusAsGuest: (bookInfo) => savedApi.get(`/check-if-saved/guest/${bookInfo.gId}`),
    checkSavedStatusAsUser: (bookInfo) => savedApi.get(`/check-if-saved/user/${bookInfo.gId}`),
    publicList: {
      getList: () => savedApi.get('/public-list'),
      postAsGuest: (bookInfo, note) => savedApi.post('/public-list/save/guest', { bookInfo, note }),
      postAsUser: (bookInfo, note) => savedApi.post('/public-list/save/user', { bookInfo, note }),
      postComment: (listItemId, comment) =>
        savedApi.post(`public-list/comment/${listItemId}`, { comment }),
      deleteComment: (listItemId, commentId) =>
        savedApi.delete('/public-list/comment', { data: { listItemId, commentId } })
    },
    userList: {
      getList: () => savedApi.get('/user-list'),
      post: (bookInfo, note) => savedApi.post('/user-list', { bookInfo, note }),
      addComment: (listItemId, comment) =>
        savedApi.post(`user-list/comment/${listItemId}`, { comment }),
      deleteComment: (listItemId, commentId) =>
        savedApi.delete('/user-list/comment', { data: { listItemId, commentId } })
    }
  }
}