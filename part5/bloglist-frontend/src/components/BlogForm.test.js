import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog}/>
    )
  })

  test('form calls event handler with right details', () => {
    const newBlog = {
      title: 'A test title',
      author: 'me',
      url: 'nourl.com'
    }
    const title = component.container.querySelector('#title')
    fireEvent.change(title, {
      target: { value: newBlog.title }
    })
    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: newBlog.author }
    })
    const url = component.container.querySelector('#url')
    fireEvent.change(url, {
      target: { value: newBlog.url }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(createBlog.mock.calls[0][0]).toEqual(newBlog)
  })
})