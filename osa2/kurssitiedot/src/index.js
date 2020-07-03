import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  const array = []
  for (let i=0; i<course.parts.length; i++) {
    array.push(course.parts[i].exercises)
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <div>
      <h1>{ course.name }</h1>
      <ul>
        {course.parts.map(part =>
          <ul key={part.name}>
            {part.name} {part.exercises} 
          </ul>
        )}
      </ul>
        <p>total of {array.reduce(reducer)} exercises</p>
    </div>
  )
}

// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course.name}</h1>
//     </div>
//   )
// }

// const Part = (props) => {
//     return (
//         <div>
//           <p>
//             {props.part} {props.exercises}
//           </p>
//         </div>
//     )
// }

// const Content = (props) => {
//     return (
//         <div>
//           <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
//           <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
//           <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
//         </div>
//     )
// }

// const Total = (props) => {
//     return (
//         <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     )
// }

ReactDOM.render(<App />, document.getElementById('root'))