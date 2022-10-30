import { HHMMSSFromMilliseconds } from "../../../utils/helpers";

function RightContent({
  duration,
  dataQuiz,
  isQuizSubmitted,
  isShowAnswer,
  currentIndex,
  setCurrentIndex,
}) {
  function getQuestionStatusClass(question, index) {
    let fixedClass =
      "border border-1 rounded-circle d-flex align-items-center justify-content-center ";

    if (index === currentIndex) {
      fixedClass += "border border-2 border-primary ";
    }

    if (isQuizSubmitted && isShowAnswer) {
      if (question.isCorrect) {
        return fixedClass + "bg-success text-white";
      } else {
        return fixedClass + "bg-danger text-white";
      }
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.some((answer, index) => answer.isSelected);

      if (isAnswered) {
        return fixedClass + "bg-secondary text-white";
      } else {
        return fixedClass + "bg-warning";
      }
    }

    return fixedClass;
  }

  return (
    <>
      <div className="fw-bold px-2 py-3 border-bottom border-bottom-1 border-primary text-primary text-center mb-4">
        <div>{HHMMSSFromMilliseconds(duration * 1000)}</div>
      </div>
      <div className="row g-2">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div className="col-auto" key={item.questionId}>
              <div
                className={getQuestionStatusClass(item, index)}
                style={{ width: "42px", height: "42px", cursor: "pointer" }}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default RightContent;
