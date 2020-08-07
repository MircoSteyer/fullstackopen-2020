import React, {useState} from "react"
import ReactDOM from "react-dom"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({counts}) => {
    const [good, neutral, bad] = counts
    const sumOfReviews = counts.reduce((sum, current) => sum + current)

    if (sumOfReviews <= 0) return <div>No feedback given.</div>
    const average = ((good - bad)/sumOfReviews).toFixed(2)
    const percentageOfPositiveReviews = ((good/sumOfReviews) * 100).toFixed(2) + "%"

    return (
        <table>
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <Statistic text={"Good"} value={good}/>
                <Statistic text={"Neutral"} value={neutral}/>
                <Statistic text={"Bad"} value={bad}/>
                <Statistic text={"All"} value={sumOfReviews}/>
                <Statistic text={"Average"} value={average}/>
                <Statistic text={"Positive"} value={percentageOfPositiveReviews}/>
            </tbody>
        </table>
    )
};



const App = () => {

    const [goodCount, setGoodCount] = useState(0)
    const [neutralCount, setNeutralCount] = useState(0)
    const [badCount, setBadCount] = useState(0)
    const counts = [goodCount, neutralCount, badCount]

    const increaseCount = (type) => () => {
        switch(type) {
            case "good":
                setGoodCount(goodCount + 1)
                break
            case "neutral":
                setNeutralCount(neutralCount + 1)
                break
            case "bad":
                setBadCount(badCount + 1)
                break
            default:
                break
        }
    }
    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={increaseCount("good")} text={"Good"}/>
            <Button onClick={increaseCount("neutral")} text={"Neutral"}/>
            <Button onClick={increaseCount("bad")} text={"Bad"}/>
            <h1>Statistics</h1>
            <Statistics counts={counts}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"))