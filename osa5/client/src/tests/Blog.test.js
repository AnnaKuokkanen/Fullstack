import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom' 
import Blog from '../components/Blog'

test('Title and author are rendered automatically, but likes and url are not', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 1000,
    url: 'url',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(component.container).not.toHaveTextContent('url')
  expect(component.container).not.toHaveTextContent('1000')
})

test('Url and likes are shown when the view button is clicked', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 1000,
    url: 'url.com',
  }

  const user = {
    username: 'uname',
    name: 'name', 
    blogs: [blog],
  }
  
  const component = render(
    <Blog blog={blog} currentUser={user} />
  )

  component.debug()

  const button = component.getByText("view")
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Title')
  expect(component.container).toHaveTextContent('Author')
  expect(component.container).toHaveTextContent('url.com')
  expect(component.container).toHaveTextContent('1000')
})

test('If like-button is pressed twice, the handler is called twice', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 1000,
    url: 'url.com',
  }

  const user = {
    username: 'uname',
    name: 'name', 
    blogs: [blog],
  }
  
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleUpdateBlog={mockHandler} currentUser={user} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  
  expect(mockHandler.mock.calls.length).toBe(2)
})