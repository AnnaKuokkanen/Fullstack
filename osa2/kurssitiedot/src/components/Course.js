import React from 'react'

const Course = ({ name, parts }) => {
    const array = []
    for (let j=0; j<parts.length; j++) {
        array.push(parts[j].exercises)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

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

export default Course