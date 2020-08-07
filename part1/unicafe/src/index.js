import React, {useState} from "react"
import ReactDOM from "react-dom"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({counts}) => {
    const [good, neutral, bad] = counts
    return (
        <div>
            <h1>Statistics</h1>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
        </div>
    );
};

const App = () => {

    const [goodCount, setGoodCount] = useState(0)
    const [neutralCount, setNeutralCount] = useState(0)
    const [badCount, setBadCount] = useState(0)

    /*    const increaseCount = (type) => {
        const handler = () => {
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
        return handler
    }*/
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
            <Statistics counts={[goodCount, neutralCount, badCount]}/>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"))