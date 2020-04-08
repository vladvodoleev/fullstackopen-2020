import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const likeBlog = jest.fn()

  const blog = {
    title: 'React patterns PLUS+++',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 8,
    id: '5e868d45f8e2d519310f6921'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeBlog} />
    )
  })

  test('renders title and author but not url and likes before view button is clicked', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('renders title, author, url and likes after view button is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('if like button is clicked twice, the event handler is called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})



