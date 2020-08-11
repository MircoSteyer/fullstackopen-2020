import React from 'react';

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    );
};

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => course.parts.map(part => <Part key={part.id} part={part}/>)

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {
    /*const total = course.parts.reduce((totalValue, currentValue) =>  totalValue + currentValue.exercises,0)*/
    const total = course.parts.map(el => el.exercises).reduce((total, current) => total + current,0)
    return <p style={{fontWeight: "bold"}}>Total of {total} exercises</p>
}

export default Course;