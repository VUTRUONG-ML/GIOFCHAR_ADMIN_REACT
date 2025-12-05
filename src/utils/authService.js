let _logout = null;

export const authService = {
  setLogout(fnLogout) {
    _logout = fnLogout;
  },
  logout() {
    if (_logout) _logout();
  },
};
