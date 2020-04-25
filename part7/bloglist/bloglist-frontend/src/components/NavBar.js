import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const NavBar = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button color="inherit" onClick={() => dispatch(logout())}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
