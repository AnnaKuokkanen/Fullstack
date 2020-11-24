import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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