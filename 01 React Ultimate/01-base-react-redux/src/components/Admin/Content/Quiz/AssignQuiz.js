import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuizToUser,
} from "../../../../services/apiServices";

function AssignQuiz() {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fecthAllQuiz();
    fecthAllUser();
  }, []);

  async function fecthAllQuiz() {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map((item) => {
        return { value: item.id, label: item.name };
      });
      setListQuiz(newListQuiz);
    }
  }

  async function fecthAllUser() {
    const res = await getAllUsers();
    if (res && res.EC === 0) {
      let newListUser = res.DT.map((item) => {
        return { value: item.id, label: `${item.id} - ${item.username} - ${item.email}` };
      });
      setListUser(newListUser);
    }
  }

  async function handleAssignQuiz() {
    if (!selectedQuiz.value) {
      toast.error("Please select quiz");
      return;
    }

    if (!selectedUser.value) {
      toast.error("Please select user");
      return;
    }

    const res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
    console.log(res);

    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  }

  return (
    <div>
      <div className="row gx-3">
        <div className="col-md-6 mb-md-0 mb-2">
          <label className="fs-6 fw-bold">Select Quiz:</label>
          <Select options={listQuiz} defaultValue={selectedQuiz} onChange={setSelectedQuiz} />
        </div>
        <div className="col-md-6">
          <label className="fs-6 fw-bold">Select User:</label>
          <Select options={listUser} defaultValue={selectedUser} onChange={setSelectedUser} />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary mt-3" onClick={handleAssignQuiz}>
          Assign
        </button>
      </div>
    </div>
  );
}

export default AssignQuiz;
