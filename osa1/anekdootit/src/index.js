import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [most, setMost] = useState(0)

  const handleAnecdote = () => {
    let rand = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(rand)
  }

  const handleVote = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
    let highest = votes[most]
    if (copy[selected] > highest) {
      setMost(selected)
    }
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br></br>
      <Button onClick={handleAnecdote} text='next anecdote' />
      <Button onClick={handleVote} text='vote' /> 
      <h1>Anecdote with most votes</h1>   
      {props.anecdotes[most]}
      <p>has {votes[most]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)