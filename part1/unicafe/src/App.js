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

const Statistic = ({name, value}) => {
  return (
    <p>
      {name} {value}
    </p>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackCount = () => {
    return good + neutral + bad;
  }
  const feedbackAverage = () => {
    return (good - bad)/feedbackCount();
  }
  const positivePercentage = () => {
    return good*100/feedbackCount();
  }

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
        <Statistic name='good' value={good}/>
        <Statistic name='neutral' value={neutral}/>
        <Statistic name='bad' value={bad}/>
        <Statistic name='all' value={feedbackCount()}/>
        <Statistic name='average' value={feedbackAverage()}/>
        <Statistic name='positive' value={positivePercentage()+' %'}/>
      </div>
    </>
  )
}

export default App