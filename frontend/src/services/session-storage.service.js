const USER_KEY = "auth-user";

class SessionStorageService {

  signOut() {
    window.sessionStorage.clear();
  }

  saveUser = (user) => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_KEY) || '{}');
  }
}

export default new SessionStorageService();
