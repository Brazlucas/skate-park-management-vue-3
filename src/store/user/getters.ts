export default {
  user: (store: any) => store.user || localStorage.getItem('user-info'),
};
