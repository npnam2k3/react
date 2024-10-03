import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res?.EC === 0) {
      setListUsers(res.DT);
    }
  };
  // useEffect duoc chay sau khi html dc render
  useEffect(() => {
    fetchListUser();
  }, []);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div
          className="btn-add-new"
          onClick={(e) => setShowModalCreateUser(true)}
        >
          <button className="btn btn-outline-primary">
            <FcPlus />
            <span>Add new user</span>
          </button>
        </div>
        <div className="table-user-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
