import React from 'react'
import { connect } from 'react-redux'
import { searchWith } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const search = event.target.value
    props.searchWith(search)
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
export default connect(
  null, 
  { searchWith }
)(Filter)