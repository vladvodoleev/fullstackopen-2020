import blogService from '../services/blogs';
import loginService from '../services/login';
import usersService from '../services/users';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const INIT_USER = 'INIT_USER';
const GET_USERS = 'GET_USERS';

const reducer = (state = { current: null, all: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, current: action.data };
    case LOGOUT:
      return { ...state, current: null };
    case INIT_USER:
      return { ...state, current: action.data };
    case GET_USERS:
      return { ...state, all: action.data };
    default:
      return state;
  }
};

export const initializeLocalUser = () => {
  const loggedUser = window.localStorage.getItem('loggedInUser');
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
  window.localStorage.removeItem('loggedInUser');
  return {
    type: LOGOUT,
  };
};

export const login = (user) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login(user);
    blogService.setToken(loggedInUser.token);
    window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    dispatch({
      type: LOGIN,
      data: loggedInUser,
    });
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const usersList = await usersService.getAll();
    dispatch({
      type: GET_USERS,
      data: usersList,
    });
  };
};

export default reducer;
