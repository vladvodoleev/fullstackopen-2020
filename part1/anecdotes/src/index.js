import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const generateRandomNumber = () => Math.floor(Math.random() * anecdotes.length)
  
  const handleClickRandom = () => setSelected(generateRandomNumber())
  
  const handleClickUpvote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  }

  const getMaxVote = () => {
    const maxVote = Math.max(...votes);
    return votes.indexOf(maxVote);
  }


  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleClickUpvote}>Upvote anecdote</button>
      <button onClick={handleClickRandom}>Random anecdote</button>
      <Anecdote title="Anecdote with most votes" anecdote={anecdotes[getMaxVote()]} votes={votes[getMaxVote()]} />
    </div>
  )
}

const Anecdote = ({title,anecdote,votes}) => {
  return (<>
    <h2>{title}</h2>
    <p>{anecdote}</p>
    <p>have {votes} votes</p>
  </>)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)