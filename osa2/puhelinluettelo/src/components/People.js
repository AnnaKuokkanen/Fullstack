import React from 'react'

const People = ({people, onClick}) => {
    return (
      <div>
        <ul>
          {people.map(person =>
            <ul key={person.name}>
              {person.name} {person.number}
              <button onClick={() => onClick(person.id)}>delete</button>
            </ul>
          )}
        </ul>
      </div>
    )
}

export default People