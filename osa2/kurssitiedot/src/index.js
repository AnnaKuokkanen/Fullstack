import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <ul>
        {courses.map(course => 
          <Course key={course.id} name={course.name} parts={course.parts} />
        )}
      </ul>
    </div>
  )
}

const Course = ({ name, parts }) => {
  const array = []
  for (let j=0; j<parts.length; j++) {
    array.push(parts[j].exercises)
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  console.log('välitetään nimi', name)
  console.log('välitetään osia', parts)

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={array.reduce(reducer)}/>
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <ul key={part.id}>
          {part.name} {part.exercises}
        </ul>
      )}
    </div>
  )
}

const Total = ({ total }) => {
  return (
    <p>Number of exercises {total}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))