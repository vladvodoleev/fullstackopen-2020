import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  const inline = {
    display: 'inline-block',
    padding: 5,
  };
  return (
    <div>
      <Link style={inline} to="/">
        blogs
      </Link>
      <Link style={inline} to="/users">
        users
      </Link>
      <p style={inline}>
        {user.name} logged in<button onClick={() => dispatch(logout())}>logout</button>
      </p>
    </div>
  );
};

export default NavBar;
