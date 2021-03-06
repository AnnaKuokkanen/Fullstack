import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': 
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)

      const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const newState = state.map(next => next.id !== action.data.id ? next : newAnecdote) 
      
      return newState.sort((a, b) => a.votes <= b.votes ? 1 : -1)
    case 'ADD_NEW':
      const newAnecdotes = [...state, action.data]

      return newAnecdotes.sort((a, b) => a.votes <= b.votes ? 1 : -1)
    case 'INIT_ANECDOTES':
      return action.data

    default: return state.sort((a, b) => a.votes <= b.votes ? 1 : -1)
  }
}

export const voteFor = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE', 
      data: { id }
    })
  }
}

export const newAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD_NEW', 
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => a.votes <= b.votes ? 1 : -1)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer