import React from 'react';
import { useParams } from 'react-router-dom';

const User = ({ users }) => {
  const id = useParams().id;
  if (!users) return null;
  const user = users.find((n) => n.id === id);
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
