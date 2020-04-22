import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, addBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeLocalUser, login, logout } from './reducers/userReducer';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs).sort((a, b) => b.likes - a.likes);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLocalUser());
  }, [dispatch]);

  const handleAddBlog = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      blogFormRef.current.toggleVisibility();
      try {
        await dispatch(addBlog(blog));
        dispatch(
          setNotification(
            { type: 'success', text: `a new blog ${blog.title} by ${blog.author} added` },
            5
          )
        );
      } catch (e) {
        dispatch(setNotification({ type: 'error', text: 'something went wrong' }, 5));
      }
    }
  };

  const loginForm = () => (
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ username, password }));
    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'wrong username or password' }, 5));
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={handleAddBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
