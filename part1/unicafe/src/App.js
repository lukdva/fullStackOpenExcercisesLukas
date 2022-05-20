import { useState } from 'react'

const Header = ({name}) => {
  return (
    <h1>
      {name}
    </h1>
  )
}
const Button = ({name, onClick}) => {
  return (
    <button onClick={onClick}>
      {name}
    </button>
  )
}

const Statistic = ({name, count}) => {
  return (
    <p>
      {name} {count}
    </p>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <Header name='Give feedback'/>
        <Button name='good' onClick={() => setGood(good + 1)}/>
        <Button name='neutral' onClick={() => setNeutral(neutral + 1)}/>
        <Button name='bad'onClick={() => setBad(bad + 1)}/>
      </div>
      <div>
        <Header name='Statistics'/>
        <Statistic name='good' count={good}/>
        <Statistic name='neutral' count={neutral}/>
        <Statistic name='bad' count={bad}/>
      </div>
    </>
  )
}

export default App