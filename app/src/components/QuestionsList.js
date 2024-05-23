import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionsList = ({ questions }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/question/${id}`);
  };

  if (!questions || questions.length === 0) {
    return (
      <div>
        <h2>You have no questions in your database..!</h2>
      </div>
    );
  }

  return (
    <div className="questions-list">
      <table className="table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Created Date</th>
            <th>Yes Percentage</th>
            <th>No Percentage</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} onClick={() => handleRowClick(question.id)}>
              <td>{question.text}</td>
              <td>{new Date(question.created_at).toLocaleDateString()}</td>
              <td>{question.yes_percentage.toFixed(2)}%</td>
              <td>{question.no_percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsList;
