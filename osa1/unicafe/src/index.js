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
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)} />
          <StatisticLine text='positive' value={good/(good + neutral + bad) * 100} text2=' %'/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value, text2 }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>   
      <td>{text2}</td>     
    </tr>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)