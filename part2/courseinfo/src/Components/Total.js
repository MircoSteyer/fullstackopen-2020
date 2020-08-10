import React from "react";

const Total = ({ course }) => {
    /*const total = course.parts.reduce((totalValue, currentValue) =>  totalValue + currentValue.exercises,0)*/
    const total = course.parts.map(el => el.exercises).reduce((total, current) => total + current,0)
    return <p>Total of {total} exercises</p>
}

export default Total