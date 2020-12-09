const initialState = {
  good: 0,
  ok: 0,
  bad: 0, 
  all: 0, 
  average: 0,
  positive: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  const all = state.all
  const good = state.good
  const ok = state.ok
  const bad = state.bad

  switch (action.type) {
    case 'GOOD':
      return {...state, 
              good: good + 1, 
              all: all + 1, 
              average: (good + 1 - bad) / (all + 1), 
              positive: (good + 1) / (all + 1) * 100
            }
    case 'OK':
      return {...state, 
              ok: ok + 1, 
              all: all + 1, 
              average: (good - bad) / (all + 1), 
              positive: good / (all + 1) * 100
            }
    case 'BAD':
      return {...state, 
              bad: bad + 1, 
              all: all + 1, 
              average: (good - bad - 1) / (all + 1),
              positive: good / (all + 1) * 100
            }
    case 'ZERO':
      return {good: 0, ok: 0, bad: 0, all: 0, average: 0, positive: 0}
    default: return state
  } 
}

export default counterReducer