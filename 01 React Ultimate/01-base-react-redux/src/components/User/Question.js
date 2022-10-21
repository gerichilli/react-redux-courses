import _ from "lodash";
import "./DetailQuiz.scss";

function Question({ index, data, handleCheckbox }) {
  if (_.isEmpty(data)) return null;

  function handleClickCheckbox(event, answerId) {
    handleCheckbox(answerId, data.questionId);
  }

  return (
    <>
      <div className="d-flex justify-content-center quiz-image mx-auto">
        {data.image && (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" className="img-fluid" />
        )}
      </div>
      <h2 className="fw-bold fs-5 mt-4 mb-3 text-center">
        Question {index + 1}: {data.questionDescription}
      </h2>
      <div className="mt-2">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer) => (
            <label className="form-check mb-1" key={answer.id}>
              <input
                className="form-check-input"
                type="checkbox"
                name={`question-${data.questionId}`}
                onChange={(e) => handleClickCheckbox(e, answer.id)}
                checked={answer.isSelected}
              />
              <p className="form-check-label mb-0">{answer.description}</p>
            </label>
          ))}
      </div>
    </>
  );
}

export default Question;
