import React from 'react'
import ReactDOM from "react-dom"

const Header = (props) => {
    return (
        <h1>{props.courseInfo.name}</h1>
    );
};

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    );
};

const Content = (props) => {
    return (
        <div>
            {props.courseInfo.parts.map(part => <Part part={part} key={part.name}/>)}
        </div>
    );
};

const Total = (props) => {
    let totalExercises = 0
    for (const part of props.courseInfo.parts) {
        totalExercises += part.exercises
    }

    return (
        <p>Number of exercises {totalExercises}</p>
    );
};


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
    }

    return (
        <div>
            <Header courseInfo={course}/>
            <Content courseInfo={course} />
            <Total courseInfo={course}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"))