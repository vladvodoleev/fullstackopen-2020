import React from 'react';
import { useField } from '../hooks/index';
import { updateBlog, removeBlog, commentBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { useParams, useHistory } from 'react-router-dom';

const Blog = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id;
  const { reset: resetComment, ...comment } = useField('text');

  if (blogs.length === 0) return null;

  const blog = blogs.find((n) => n.id === id);

  const handleLike = async () => {
    const newBlog = {
      user: blog.user ? blog.user.id : null,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    };
    try {
      await dispatch(updateBlog(newBlog));
      dispatch(setNotification({ type: 'success', text: `you liked ${blog.title}` }, 5));
    } catch (e) {
      dispatch(setNotification({ type: 'error', text: 'something went wrong' }, 5));
    }
  };

  const handleRemove = async () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      try {
        history.push('/');
        await dispatch(removeBlog(blog));
        dispatch(setNotification({ type: 'success', text: `you removed a ${blog.title} blog` }, 5));
      } catch (e) {
        dispatch(setNotification({ type: 'error', text: 'something went wrong' }, 5));
      }
    }
  };

  const addNewComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(comment.value, id));
    resetComment();
  };

  const compareUsers = () => {
    if (!blog.user) return false;
    return blog.user.name === user.name && blog.user.username === user.username;
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      {compareUsers() ? <button onClick={handleRemove}>remove</button> : null}
      <h3>comments</h3>
      <form onSubmit={addNewComment}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={comment + i}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
