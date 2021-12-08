import http from './http';

const IS_AUTH = 'isAuth';
const TOKEN_KEY = 'auth-token';

/**
 * Login
 *
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 *
 * @example login({email: "email@email.com", password: "Password123"})
 *
 */
export const login = async ({
  email,
  password = '9,2Nli1H:C&Vmyl<9:Y)VV1t[jQN7rS7Laf|sip*]X_Fi)IX5',
}) => {
  const res = await http.post('login/', { username: email, password });
  window.sessionStorage.removeItem(IS_AUTH);
  window.sessionStorage.setItem(IS_AUTH, true);

  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, res.data.access);
  return res;
};

/**
 * Register
 *
 * @param {Object} params
 * @param {string} params.email
 *
 * @example register({email: "gdsc@gmail.com"})
 */
export const register = ({ email }) => {
  return http.post('register/', { username: email });
};

/**
 * Logout
 */
export const logout = async () => {
  await http.post('logout/');
  window.sessionStorage.setItem(IS_AUTH, false);
};

/**
 * @param {Object} params
 * @param {string} params.email
 *
 * @description Returns the user data or "signup" if the user doesn't exist
 * @example getUser({emaiL: "gdsc@ateneo.com"})
 */
export const getUser = ({ email }) => {
  return http.get(`users/?user=${email}`);
};

export const signup = () => {
  window.sessionStorage.removeItem(IS_AUTH);
  window.sessionStorage.setItem(IS_AUTH, true);
};

export const isAuthenticate = () => {
  return window.sessionStorage.getItem(IS_AUTH);
};

export const saveToken = (token) => {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};
