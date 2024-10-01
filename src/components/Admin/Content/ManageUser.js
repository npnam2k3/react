import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState } from "react";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
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
        <div className="table-user-container">table users</div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
