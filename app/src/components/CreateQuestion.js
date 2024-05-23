import React, { useState, useEffect } from "react";
import { createQuestion, fetchQuestions } from "../services/questionService";
import "./CreateQuestion.css";
import { useNavigate } from "react-router-dom";

const CreateQuestion = ({ onQuestionCreated }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (creating) {
      const timer = setTimeout(async () => {
        try {
          const questions = await fetchQuestions();
          const largestId = Math.max(
            ...questions.map((question) => question.id)
          );
          navigate(`/question/${largestId}`);
        } catch (err) {
          setError(err.message);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [creating, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setCreating(true);

    try {
      await createQuestion(text);
      setSuccess(true);
      setText("");
      onQuestionCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (creating) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="create-question-container">
      <h2>Create a New Question</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Question created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="questionText" className="form-label">
            Question Text:
          </label>
          <input
            id="questionText"
            className="form-control"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
