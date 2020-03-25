import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const getAverageScore = () => {
    let score = (good - bad) / (good + bad + neutral);
    return isNaN(score) ? 0 : score;
  };

  const getPositivePercentage = () => {
    let percentage = (good / (good + neutral + bad)) * 100;
    percentage = isNaN(percentage) ? 0 : percentage;
    return `${percentage} %`;
  };

  return (
    <table>
      <Statistic number={good} text="good" />
      <Statistic number={neutral} text="neutral" />
      <Statistic number={bad} text="bad" />
      <Statistic number={good + neutral + bad} text="all" />
      <Statistic number={getAverageScore()} text="average" />
      <Statistic number={getPositivePercentage()} text="positive" />
    </table>
  );
};

const Statistic = ({ number, text }) => (
  <tr>
    <td>{text}</td>
    <td>{number}</td>
  </tr>
);

ReactDOM.render(<App />, document.getElementById("root"));
