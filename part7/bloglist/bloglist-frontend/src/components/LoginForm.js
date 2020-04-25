import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { TextField, Button } from '@material-ui/core';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      dispatch(login({ username, password }));
    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'wrong username or password' }, 5));
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
