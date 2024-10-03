import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserWithPaginate,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res?.EC === 0) {
      setListUsers(res.DT);
    }
  };
  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res?.EC === 0) {
      console.log(res.DT);
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  // useEffect duoc chay sau khi html dc render
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataView(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-outline-primary"
            onClick={(e) => setShowModalCreateUser(true)}
          >
            <FcPlus />
            <span>Add new user</span>
          </button>
        </div>
        <div className="table-user-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
          resetUpdateData={resetUpdateData}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView={dataView}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
