import blogService from '../services/blogs';
import loginService from '../services/login';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const INIT_USER = 'INIT_USER';

const reducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return null;
    case INIT_USER:
      return action.data;
    default:
      return state;
  }
};

export const initializeLocalUser = () => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    blogService.setToken(user.token);
    return {
      type: INIT_USER,
      data: user,
    };
  }
  return {
    type: INIT_USER,
    data: null,
  };
};

export const logout = () => {
  blogService.setToken(null);
  window.localStorage.removeItem('loggedUser');
  return {
    type: LOGOUT,
  };
};

export const login = (user) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(user);
    blogService.setToken(user.token);
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch({
      type: LOGIN,
      data: loggedInUser,
    });
  };
};

export default reducer;
