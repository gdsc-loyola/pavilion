const TOKEN_KEY = 'auth-token';
const IS_AUTH = 'isAuth';

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    window.sessionStorage.removeItem(IS_AUTH);
    window.sessionStorage.setItem(IS_AUTH, this.authenticated);
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    window.sessionStorage.setItem(IS_AUTH, this.authenticated);
    cb();
  }

  signup(cb) {
    this.authenticated = true;
    window.sessionStorage.removeItem(IS_AUTH);
    window.sessionStorage.setItem(IS_AUTH, this.authenticated);
    cb();
  }

  isAuthenticate() {
    return window.sessionStorage.getItem(IS_AUTH);
  }

  saveToken = (token) => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  };

  getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
  };
}

export default new Auth();
