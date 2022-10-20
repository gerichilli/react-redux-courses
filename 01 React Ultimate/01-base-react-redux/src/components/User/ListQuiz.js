import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";

function ListQuiz() {
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  async function getQuizData() {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      console.log(res);
      setArrQuiz(res.DT);
    }
  }
  return (
    <div className="container">
      {arrQuiz && arrQuiz.length > 0 && (
        <ul className="quiz-container">
          {arrQuiz.map((quiz, index) => (
            <li className="card" style={{ width: "18rem" }} key={quiz.id}>
              <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="" />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button className="btn btn-primary">Start now</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {arrQuiz && arrQuiz.length === 0 && <p className="text-center">You don't have any quiz...</p>}
    </div>
  );
}

export default ListQuiz;
