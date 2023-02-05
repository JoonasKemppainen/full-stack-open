import { useState } from 'react'

const Header = () => (
      <h1>give feedback</h1>
  )

const Button = (props) => {
  return (
    <>
    <button onClick={props.onClick}>{props.name}</button>
    </>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral=== 0 && props.bad === 0) {
    return (
      <div>
        <h1>
          statistics
      </h1>
      <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>
        statistics
      </h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleFeedbackClick = (feedback) => {
    if (feedback === "good") setGood(good + 1);
    if (feedback === "neutral") setNeutral(neutral + 1);
    if (feedback === "bad") setBad(bad + 1);
    setAll(all + 1);
  };

  // rajoitin nämä kahteen desimaaliin ulkonäön vuoksi
  const average = all ? ((good * 1) + (bad * -1)) / all : 0;
  const roundedAverage = average ? average.toFixed(2) : 0;
  const positive = all ? (good / all * 100).toFixed(2) + "%" : "0%";

  return (
    <div>
      <Header />
      <Button name="good" onClick={() => handleFeedbackClick("good")} />
      <Button name="neutral" onClick={() => handleFeedbackClick("neutral")} />
      <Button name="bad" onClick={() => handleFeedbackClick("bad")} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} positive={positive} average={roundedAverage} />
    </div>
  )
}

export default App