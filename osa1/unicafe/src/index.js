import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, bad, neutral}) => {
  if (good + bad + neutral === 0) {
      return (
        <div>
          <p>no feedbacks given</p>
        </div>
      )
  } 
  return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad)/(good + neutral + bad)}</p>
        <p>positive {good/(good + neutral + bad) * 100} %</p>
      </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)