import { BsPencilSquare, BsTrash } from "react-icons/bs";

function TableQuiz({ listQuiz, handleClickBtnUpdateQuiz, handleClickBtnDeleteQuiz }) {
  return (
    <>
      <h2 className="fs-4 fw-bold mb-2">List quizzes</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Difficulity</th>
              <th scope="col">Settings</th>
            </tr>
          </thead>
          <tbody>
            {listQuiz && listQuiz.length > 0 ? (
              listQuiz.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleClickBtnUpdateQuiz(item)}
                      >
                        <BsPencilSquare />
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleClickBtnDeleteQuiz(item)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No quiz</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableQuiz;
