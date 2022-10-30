import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function QuizQAAnswer({
  index,
  questionId,
  answersLength,
  answerData,
  handleOnChangeAnswer,
  handleAddRemoveAnswer,
}) {
  return (
    <li className="answer mt-2 ms-2 row gx-3 align-items-center">
      <input
        name="answer-check"
        className="form-check-input"
        type="checkbox"
        checked={answerData.isCorrect}
        onChange={(event) =>
          handleOnChangeAnswer("CHECKBOX", questionId, answerData.id, event.target.checked)
        }
      />
      <div className="col-6">
        <div className="form-floating">
          <input
            name="answer"
            type="text"
            className={`form-control ${answerData.isValid ? "" : "is-invalid"}`}
            placeholder="Answer"
            value={answerData.description}
            onChange={(event) =>
              handleOnChangeAnswer("INPUT", questionId, answerData.id, event.target.value)
            }
          />
          <label>Answer {index + 1} description</label>
        </div>
      </div>
      <div className="col">
        <button
          className="btn px-0 border-0 text-primary me-2"
          type="button"
          onClick={() => handleAddRemoveAnswer("ADD", questionId)}
        >
          <AiFillPlusCircle aria-label="Add" size="2em" />
        </button>
        {answersLength > 1 && (
          <button
            className="btn px-0 border-0 text-warning"
            type="button"
            onClick={() => handleAddRemoveAnswer("REMOVE", questionId, answerData.id)}
          >
            <AiFillMinusCircle aria-label="Remove" size="2em" />
          </button>
        )}
      </div>
    </li>
  );
}

export default QuizQAAnswer;
