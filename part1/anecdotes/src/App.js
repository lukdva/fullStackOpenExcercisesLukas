import { useState } from 'react'
const Anecdote = ({title, anecdote, voteCount}) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>
      {'has ' + voteCount + ' votes'}
    </div>
    </>
  )
}

const Button = ({text, action}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const random = (maxValue) => {
    return Math.floor(Math.random() * maxValue)
  }
  const handleNextButtonClick = () => {
    setSelected(random(anecdotes.length))
  }
  const handleVoteButtonClick = () => {
    const votesCopy = [...votes];
    votesCopy[selected]++;
    setVotes(votesCopy);
  }
  const largestIndex = ((array) => {
    let largest = array[0];
    let largestIndex = 0;
    for(let i = 1; i< array.length; i++) {
      if(array[i] > largest) {
        largest = array[i];
        largestIndex = i;
      }
    }
    return largestIndex;
  })(votes);

  return (
    <>
    <Anecdote title='Anecdote of the Day' anecdote={anecdotes[selected]} voteCount={votes[selected]}/>
    <div>
      <Button text='vote' action={handleVoteButtonClick}/>
      <Button text='next anecdote' action={handleNextButtonClick}/>
    </div>
    <Anecdote title='Anecdote with most votes' anecdote={anecdotes[largestIndex]} voteCount={votes[largestIndex]}/>
    </>
  )
}

export default App