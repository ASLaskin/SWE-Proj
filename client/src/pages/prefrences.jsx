import React, { useState } from "react";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [ratings, setRatings] = useState(Array(10).fill(false)); // Array with 10 false values
// take use state and push it into array
  const questions = [
    {
      cuisine: "Indian",
      text: "Indian",
    },
    {
      cuisine: "Italian",
      text: "Italian",
    },
    {
      cuisine: "Japanese",
      text: "Japanese",
    },
    {
      cuisine: "Mexican",
      text: "Mexican",
    },
    {
      cuisine: "Thai",
      text: "Thai",
    },
    {
      cuisine: "Chinese",
      text: "Chinese",
    },
    {
      cuisine: "Greek",
      text: "Greek",
    },
    {
      cuisine: "French",
      text: "French",
    },
    {
      cuisine: "Korean",
      text: "Korean",
    },
    {
      cuisine: "Brazilian",
      text: "Brazilian",
    },
  ];

  const handleCheckboxChange = (event, index) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = event.target.checked;
    setRatings(updatedRatings);
  };

  const handleAnswerSubmit = () => {
    setShowResults(true);
    localStorage.setItem("ratings", JSON.stringify(ratings));
  };

  React.useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || Array(10).fill(false);
    setRatings(storedRatings);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {showResults ? (
          <div className="results-container">
            <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
            {questions.map((question, index) => (
              <p key={index} className="mb-2">
                {question.cuisine}: {ratings[index] ? "Yes" : "No"}
              </p>
            ))}
          </div>
        ) : (
          <div className="form-container">
            <h2 className="text-2xl font-semibold mb-4">Pick Cuisine Preferences</h2>
            {questions.map((question, index) => (
              <div className="checkbox-item mb-2" key={index}>
                <p className="flex items-center">
                  {question.text}&nbsp;
                  <label className="ml-2">
                    <input
                      type="checkbox"
                      checked={ratings[index]}
                      onChange={(event) => handleCheckboxChange(event, index)}
                    />
                  </label>
                </p>
              </div>
            ))}
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleAnswerSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;