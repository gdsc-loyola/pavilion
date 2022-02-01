const USER_KEY = 'auth-user';

class UserSession {
  signOut = () => {
    window.sessionStorage.clear();
  };

  setUser = (payload) => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, payload);
  };

  getUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  };
}

export default new UserSession();
