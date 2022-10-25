import Countdown from "./Countdown";

function RightContent({ dataQuiz, handleFinishQuiz }) {
  function onTimeUp() {
    handleFinishQuiz();
  }
  return (
    <>
      <div className="fw-bold px-2 py-3 border-bottom border-bottom-1 border-primary text-primary text-center mb-4">
        <Countdown onTimeUp={onTimeUp} />
      </div>
      <div className="row g-2">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div className="col-auto" key={item.questionId}>
              <div
                className="border border-1 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "42px", height: "42px", cursor: "pointer" }}
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
