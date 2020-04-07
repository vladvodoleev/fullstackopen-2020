import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async event => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })
      setBlogs([...blogs].concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
        type="text"
        value = {title}
        name="Title"
        onChange = {({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value = {author}
        name="Author"
        onChange = {({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value = {url}
        name="Url"
        onChange = {({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm