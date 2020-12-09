import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>

      {store.getState().good + store.getState().bad + store.getState().ok > 0 ? (
        <div>
          <h2>Statistics</h2>
          <div>good {store.getState().good}</div>
          <div>neutral {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
          <div>all {store.getState().all}</div>
          <div>average {store.getState().average}</div>
          <div>positive {store.getState().positive} %</div>
        </div>
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
