import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

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
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
