export default {
  token: (store: any) => store.token || localStorage.getItem('token'),
  isAuthenticated: (store: any) => store.isAuthenticated === true,
};
