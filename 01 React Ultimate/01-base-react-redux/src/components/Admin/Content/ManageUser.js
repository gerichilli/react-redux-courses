import { useState, useEffect } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import { AiOutlineUserAdd } from "react-icons/ai";
import { getAllUsers, getUsersWithPaginate } from "../../services/apiServices";
import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const LIMIT_USERS = 5;

function ManageUser() {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listUsers, setListUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);

  async function fetchListUsersWithPaginate(page) {
    console.log("fetchListUsersWithPaginate", page);
    const res = await getUsersWithPaginate(page, LIMIT_USERS);

    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  }

  function handleClickBtnUpdateUser(user) {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  }

  function handleClickBtnViewUser(user) {
    setShowModalViewUser(true);
    setDataView(user);
  }

  function handleClickBtnDeleteUser(user) {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  }

  function resetUpdateData() {
    setDataUpdate({});
  }

  return (
    <div className="manage-user-container">
      <div className="d-flex align-items-center mb-4">
        <h1 className="user-title me-auto">Manage Users</h1>
        <button
          className="btn btn-primary d-flex align-items-center me-lg-2"
          onClick={() => setShowModalCreateUser(true)}
        >
          <AiOutlineUserAdd size="1.25em" className="me-2" /> Add new users
        </button>
      </div>
      <div className="user-content">
        <div className="user-table-container">
          <TableUserPaginate
            listUsers={listUsers}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fetchListUsers={fetchListUsersWithPaginate}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnViewUser={handleClickBtnViewUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUsers={fetchListUsersWithPaginate}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView={dataView}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUsers={fetchListUsersWithPaginate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUsers={fetchListUsersWithPaginate}
        />
      </div>
    </div>
  );
}

export default ManageUser;
