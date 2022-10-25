import axios from "../utils/axiosCustomize";

export async function postCreateNewUser(email, password, username, role, image) {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
}

export async function putUpdateUser(id, username, role, image) {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
}

export async function deleteUser(id) {
  return axios.delete("api/v1/participant", { data: { id } });
}

export async function getAllUsers() {
  return axios.get("api/v1/participant/all");
}

export async function getUsersWithPaginate(page, limit) {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

export async function postLogin(email, password) {
  return axios.post("api/v1/login", { email, password, delay: 3000 });
}

export async function postRegister(email, username, password) {
  return axios.post("api/v1/register", { email, username, password });
}

export async function getQuizByUser() {
  return axios.get(`api/v1/quiz-by-participant`);
}

export async function getDataQuizById(id) {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

export async function postSubmitQuiz(data) {
  return axios.post("api/v1/quiz-submit", { ...data });
}

export async function postCreateNewQuiz(name, description, difficulty, image) {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.post("api/v1/quiz", data);
}

export async function getAllQuizForAdmin() {
  return axios.get("api/v1/quiz/all");
}

export async function putUpdateQuiz(id, name, description, difficulty, image) {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.put("api/v1/quiz", data);
}

export async function deleteQuiz(quizId) {
  return axios.delete(`api/v1/quiz/${quizId}`);
}

export async function postCreateNewQuestion(quizId, description, questionImage) {
  const data = new FormData();
  data.append("quiz_id", quizId);
  data.append("description", description);
  data.append("questionImage", questionImage);

  return axios.post("api/v1/question", data);
}

export async function postCreateNewAnswer(description, correct_answer, question_id) {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
}

export async function getQuizQuestionsAndAnswers(quizId) {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

export async function postAssignQuizToUser(quizId, userId) {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
}

export async function postUpsertQA(data) {
  return axios.post("api/v1/quiz-upsert-qa", { ...data });
}
