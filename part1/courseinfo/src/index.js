import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Part = ({name, exercises}) => {
    return(
        <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
    return(
        parts.map((part,i) => (
            <Part
            key = {i}
            name = {part.name}
            exercises = {part.exercises}/>)
        )
    )
}

const Total = ({parts}) => {
    const exercisesHours = parts.map(part => part.exercises)
    const total = exercisesHours.reduce((total, hours) => total + hours, 0);
    return <p>Number of exercises {total}</p>;
}

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} /> 
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))