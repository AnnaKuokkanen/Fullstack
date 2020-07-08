import React from 'react'

const Filter = ({handler, value}) => {
    return (
        <div>
        filter shown with
        <input
            onChange={handler}
            value={value}
        />
        </div>
    )
}
export default Filter