import axios from "axios";

const API_URL = "http://localhost:8000/questions/";

export const fetchQuestions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createQuestion = async (text) => {
  const response = await axios.post(API_URL, { text });
  return response.data;
};

export const fetchQuestionDetail = async (questionId) => {
  const response = await axios.get(`${API_URL}${questionId}/`);
  return response.data;
};

export const fetchQuestionResponses = async (questionId) => {
  const response = await axios.get(`${API_URL}${questionId}/responses/`);
  return response.data;
};
