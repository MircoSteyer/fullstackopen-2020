import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdote, anecdoteOfTheDay = false, anecdoteWithMostVotes = false}) => {

    if (anecdoteOfTheDay) return (<div><h1>Anecdote of the day</h1><p>{anecdote}</p></div>)
    if (anecdoteWithMostVotes) return (<div><h1>Anecdote with most votes</h1><p>{anecdote}</p></div>)
}

const Votes = ({currentAnecdote, votes}) => <p>Has {votes[currentAnecdote]} votes.</p>

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const indexOfMostVotedAnecdote = votes.indexOf(Math.max(...votes))

    const increaseVote = (currentAnecdote) => {
        let copy = [...votes]
        copy[currentAnecdote] += 1
        setVotes(copy)
    }

    return (
        <div>
            <div>
                <Anecdote anecdote={anecdotes[selected]} anecdoteOfTheDay={true}/>
                <Votes votes={votes} currentAnecdote={selected}/>
                <Button onClick={() => increaseVote(selected)} text={"Give vote."}/>
                <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
                        text={"Next random anecdote."}/>
            </div>
            <div>
                <Anecdote anecdote={anecdotes[indexOfMostVotedAnecdote]} anecdoteWithMostVotes={true}/>
                <Votes votes={votes} currentAnecdote={indexOfMostVotedAnecdote}/>
            </div>
        </div>

    )
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
