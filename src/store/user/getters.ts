export default {
  user: (state: any) => state.user || JSON.parse(localStorage.getItem('user-info') || 'null'),
};
