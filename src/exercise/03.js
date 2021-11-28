import * as React from 'react'

const CountContext = React.createContext()

const CountProvider = ({children, ...restProps}) => {
  const value = React.useState(0)
  return (
    <CountContext.Provider value={value} {...restProps}>
      {children}
    </CountContext.Provider>
  )
}

const useCount = () => {
  const contextValue = React.useContext(CountContext)

  if (!contextValue) {
    throw new Error('useCount must be used within a CountProvider.')
  }

  return contextValue
}

function CountDisplay() {
  const [count] = useCount()
  console.log({count})
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountDisplay />
      <Counter />
    </div>
  )
}

export default App
