import React from 'react'

const People = ({people}) => {
    return (
      <div>
        <ul>
          {people.map(person =>
            <ul key={person.name}>
              {person.name} {person.number}
            </ul>
          )}
        </ul>
      </div>
    )
}

export default People