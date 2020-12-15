import React from 'react'
import { useDispatch } from 'react-redux'
import { searchWith } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value
    dispatch(searchWith(search))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter