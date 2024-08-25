export default {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};
