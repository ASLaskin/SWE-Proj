import React, { useState } from "react";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [ratings, setRatings] = useState([]);

  const questions = [
    {
      cuisine: "Indian",
      text: "How would you rate Indian food?",
      description: "On a scale of 1-100 with 1 being bad and 100 being good",
    },
    {
      cuisine: "Italian",
      text: "What are your thoughts on Italian cuisine?",
      description: "Rate it from 1 to 100",
    },
    {
      cuisine: "Japanese",
      text: "How do you feel about Japanese food?",
      description: "Give it a score between 1 and 100",
    },
    {
      cuisine: "Mexican",
      text: "What's your opinion on Mexican dishes?",
      description: "Rate them from 1 to 100",
    },
    {
      cuisine: "Thai",
      text: "How much do you enjoy Thai food?",
      description: "Scale of 1 to 100",
    },
    {
      cuisine: "Chinese",
      text: "Rate Chinese cuisine:",
      description: "1 (not a fan) to 100 (love it)",
    },
    {
      cuisine: "Greek",
      text: "What's your preference for Greek food?",
      description: "Score it from 1 to 100",
    },
    {
      cuisine: "French",
      text: "How would you rate French cuisine?",
      description: "On a scale of 1-100",
    },
    {
      cuisine: "Korean",
      text: "Opinion on Korean dishes?",
      description: "Give it a score between 1 and 100",
    },
    {
      cuisine: "Brazilian",
      text: "What's your overall impression of Brazilian food?",
      description: "Rate it from 1 to 100",
    },
  ];

  const handleSliderChange = (event) => {
    const rating = parseInt(event.target.value, 10);
    setScore(rating);
  };

  const handleAnswerSubmit = () => {
    const updatedRatings = [...ratings];
    updatedRatings[currentQuestion] = score;
    setRatings(updatedRatings);
  
    if (currentQuestion === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  React.useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || [];
    setRatings(storedRatings);
  }, []);

  return (
    <div className="App">
      {showResults ? (
        <div>
          <h2>Preferences</h2>
          {questions.map((question, index) => (
            <p key={index}>
              {question.cuisine}: {ratings[index]}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <p>{questions[currentQuestion].text}</p>
          <p>{questions[currentQuestion].description}</p>
          <Slider onChange={handleSliderChange} />
          <button onClick={handleAnswerSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

const Slider = ({ onChange }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10); 
    setValue(newValue); 
    onChange(event); // Notify parent component about the change
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
      />
      <p>Value: {value}</p>
    </div>
  );
};


export default App;