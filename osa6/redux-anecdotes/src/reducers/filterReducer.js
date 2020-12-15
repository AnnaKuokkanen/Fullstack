const reducer = (state='', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SEARCH_ANECDOTE':
      return action.filter
    default: return state
  }
}

export const searchWith = (filter) => {
  return {
    type: 'SEARCH_ANECDOTE',
    filter
  }
}

export default reducer