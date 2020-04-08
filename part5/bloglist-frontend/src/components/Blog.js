import React, {useState} from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const newBlog = {
      user: blog.user ? blog.user.id : null,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    likeBlog(newBlog, blog.id)
  }

  const handleRemove = () => {
    removeBlog(blog, blog.id)
  }

  const compareUsers = () => {
    if (!blog.user) return false
    return blog.user.name === user.name && blog.user.username === user.username
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowFullInfo(!showFullInfo)}>view</button>
      </div>
      {showFullInfo ? 
        (<>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
          {blog.user ? <div>{blog.user.name}</div> 
          : null}
          {compareUsers() ? 
            <button onClick={handleRemove}>remove</button> : 
            null
          }
        </>) :
        null}
      
    </div>
  )
}

export default Blog
