import {useContext, createContext} from 'react'

let SecretContext = createContext('this is a default secret value');

function App() {
  return (
    <>
      <SecretContext.Provider value={'this is a custom secret value'}>
        <Child />
      </SecretContext.Provider>
      
      <SecretContext.Provider>
        <Sibling />
      </SecretContext.Provider>

      <Cousin />
    </>
  )
}

function Sibling() {
  return <p>{useContext(SecretContext) || 'no secret value found'}</p>
}

function Cousin() {
  return <p>{useContext(SecretContext)}</p>
}

function Child () {
  return <Grandchild />
}

function Grandchild () {
  return <GreatGrandchild />
}

function GreatGrandchild () {
  return <p>{useContext(SecretContext)}</p>
}

export default App;