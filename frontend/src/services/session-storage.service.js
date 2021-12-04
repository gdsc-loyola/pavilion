const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

class SessionStorageService {
  signOut = () => {
    window.sessionStorage.clear();
  };

  saveUser = (user) => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  };

  getUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  };

  saveToken = (token) => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  };

  getToken = () => {
    return sessionStorage.getItem(USER_TOKEN);
  };
}

export default new SessionStorageService();
