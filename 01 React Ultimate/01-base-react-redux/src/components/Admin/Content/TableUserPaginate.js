import ReactPaginate from "react-paginate";
import { BsFillPersonLinesFill, BsPencilSquare, BsTrash } from "react-icons/bs";

function TableUserPaginate({
  listUsers,
  pageCount,
  currentPage,
  setCurrentPage,
  fetchListUsers,
  handleClickBtnUpdateUser,
  handleClickBtnViewUser,
  handleClickBtnDeleteUser,
}) {
  // Invoke when user click to request another page.
  async function handlePageClick(event) {
    setCurrentPage(event.selected + 1);
    await fetchListUsers(event.selected + 1);
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user) => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => {
                      handleClickBtnViewUser(user);
                    }}
                  >
                    <BsFillPersonLinesFill />
                  </button>
                  <button
                    className="btn btn-outline-warning me-2"
                    onClick={() => handleClickBtnUpdateUser(user)}
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleClickBtnDeleteUser(user)}
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            );
          })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
}

export default TableUserPaginate;
