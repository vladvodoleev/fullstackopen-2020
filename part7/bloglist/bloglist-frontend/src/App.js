import React, { useEffect } from 'react';
import Blog from './components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, addBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeLocalUser, getUsers } from './reducers/userReducer';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import User from './components/User';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Card, Typography, Link as LinkMUI } from '@material-ui/core';

import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs).sort((a, b) => b.likes - a.likes);
  const user = useSelector((state) => state.users.current);
  const users = useSelector((state) => state.users.all);

  const blogFormRef = React.createRef();

  const blogLinkStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeLocalUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
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

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <Container>
      <Router>
        <NavBar user={user} />
        <h2>blogs</h2>
        <Notification />
        {/* <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p> */}
        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} user={user} />
          </Route>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/users/">
            <Users users={users} />
          </Route>
          <Route path="/">
            <h2>create new</h2>
            <Togglable buttonLabel="new note" ref={blogFormRef}>
              <BlogForm createBlog={handleAddBlog} />
            </Togglable>
            <Typography>
              {blogs.map((blog) => (
                // <Blog key={blog.id} blog={blog} user={user} />
                <Card variant="outlined" key={blog.id}>
                  <LinkMUI color="inherit" component={Link} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </LinkMUI>
                </Card>
              ))}
            </Typography>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
