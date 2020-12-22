import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notifyWith } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id) => {
    console.log('vote', id)
    props.voteFor(id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    props.notifyWith(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  voteFor,
  notifyWith,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList