import React from 'react'

const PersonForm = ({onSubmit, nameHandler, nameValue, numberHandler, numberValue}) => {
    return (
      <div>
        <form onSubmit={onSubmit}>
          name:
          <input
            onChange={nameHandler}
            value={nameValue}
          /> 
          <br></br> 
          number:
          <input
            onChange={numberHandler}
            value={numberValue}
          /> 
          <br></br> 
          <button type="submit">add</button>
        </form>
      </div>
    )
}

export default PersonForm