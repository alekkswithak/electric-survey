import React from "react";
import { useState, useEffect } from "react";
import CreateQuestion from "./components/CreateQuestion";
import { fetchQuestions } from "./services/questionService";
import QuestionsList from "./components/QuestionsList";

const App = () => {
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestionsData();
  }, []);

  const fetchQuestionsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="my-4">
        {error && <p className="alert alert-danger">{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && (
          <div>
            <CreateQuestion onQuestionCreated={fetchQuestionsData} />
            <QuestionsList questions={questions} />
          </div>
        )}
        {!loading && !error && questions === null && (
          <div>
            <h2 className="alert alert-info">
              Frontend and Backend are not connected!
            </h2>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
