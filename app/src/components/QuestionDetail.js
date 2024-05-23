import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchQuestionDetail,
  fetchQuestionResponses,
} from "../services/questionService";
import ResponseFilter from "./ResponseFilter";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import "./QuestionDetail.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [filters, setFilters] = useState({
    answer: "",
    gender: "",
    age: "",
    region: "",
    education: "",
    relationship_status: "",
    occupation: "",
    household_income: "",
    social_class: "",
    smoking_frequency: "",
    credit_card_debt: "",
  });

  useEffect(() => {
    const getQuestionAndResponses = async () => {
      try {
        const questionData = await fetchQuestionDetail(id);
        setQuestion(questionData);
        const responseData = await fetchQuestionResponses(id);
        setResponses(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getQuestionAndResponses();

    const interval = setInterval(async () => {
      try {
        const responseData = await fetchQuestionResponses(id);
        setResponses(responseData);
        if (responseData.length >= 500) {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredResponses = responses.filter((response) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      let responseValue = String(response[key]).toLowerCase();
      let filterValue = filters[key].toLowerCase();

      if (responseValue.includes("£")) {
        responseValue = responseValue.replace(/£/g, "");
      }

      if (key === "age") {
        if (filterValue.includes("-")) {
          const [minAge, maxAge] = filterValue.split("-").map(Number);
          return response[key] >= minAge && response[key] <= maxAge;
        }
      }

      return responseValue.startsWith(filterValue);
    });
  });

  const yesCount = filteredResponses.filter(
    (response) => response.answer.toLowerCase() === "yes"
  ).length;
  const noCount = filteredResponses.filter(
    (response) => response.answer.toLowerCase() === "no"
  ).length;
  const dontKnowCount = filteredResponses.filter(
    (response) => response.answer.toLowerCase() === "don't know"
  ).length;

  const pieData = [
    { label: "Yes", value: yesCount },
    { label: "No", value: noCount },
    { label: "Don't know", value: dontKnowCount },
  ];

  const barData = [
    { label: "Yes", value: yesCount },
    { label: "No", value: noCount },
    { label: "Don't know", value: dontKnowCount },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <h2>Question not found!</h2>;
  }

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "chart" : "table"));
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{question.text}</h1>
          <p className="card-text">
            <strong>Created Date:</strong>{" "}
            {new Date(question.created_at).toLocaleDateString()}
          </p>
          <button className="btn btn-primary" onClick={handleGoBack}>
            Back to Questions
          </button>
        </div>
      </div>

      <ResponseFilter filters={filters} onChange={handleFilterChange} />

      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h2>
          Responses ({filteredResponses.length} out of {responses.length})
        </h2>
        <button className="btn btn-secondary mb-3" onClick={toggleViewMode}>
          {viewMode === "table" ? "Show Charts" : "Show Table"}
        </button>
      </div>

      {viewMode === "table" ? (
        responses.length === 0 ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Answer</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Region</th>
                <th>Education</th>
                <th>Relationship Status</th>
                <th>Occupation</th>
                <th>Household Income</th>
                <th>Social Class</th>
                <th>Smoking Frequency</th>
                <th>Credit Card Debt</th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((response) => (
                <tr key={response.id}>
                  <td>{response.answer}</td>
                  <td>{response.gender}</td>
                  <td>{response.age}</td>
                  <td>{response.region}</td>
                  <td>{response.education}</td>
                  <td>{response.relationship_status}</td>
                  <td>{response.occupation}</td>
                  <td>{response.household_income}</td>
                  <td>{response.social_class}</td>
                  <td>{response.smoking_frequency}</td>
                  <td>{response.credit_card_debt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        <div className="d-flex justify-content-around">
          <div className="centered-chart">
            <PieChart data={pieData} width={400} height={400} />
          </div>
          <div className="centered-chart">
            <BarChart data={barData} width={400} height={400} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
