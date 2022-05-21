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

const StatisticLine = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const feedbackCount = () => {
    return good + neutral + bad;
  }
  const feedbackAverage = () => {
    return (good - bad)/feedbackCount();
  }
  const positivePercentage = () => {
    return good*100/feedbackCount();
  }

  if (feedbackCount() > 0)
  return (
    <div>
        <Header name='Statistics'/>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={feedbackCount()}/>
        <StatisticLine text='average' value={feedbackAverage()}/>
        <StatisticLine text='positive' value={positivePercentage()+' %'}/>
      </div>
  )
  else
  return (
    <div>
      <Header name='Statistics'/>
      <p> No feedback given </p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick= () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick= () => {
    setBad(bad + 1)
  }
  return (
    <>
      <div>
        <Header name='Give feedback'/>
        <Button name='good' onClick={handleGoodClick}/>
        <Button name='neutral' onClick={handleNeutralClick}/>
        <Button name='bad'onClick={handleBadClick}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App