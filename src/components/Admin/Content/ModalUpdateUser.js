import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, fetchListUser, dataUpdate, resetUpdateData } = props;
  //   const [show, setShow] = useState(showModel);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRole("USER");
    setUsername("");
    setImage("");
    setPreviewImage("");
    resetUpdateData();
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update State
      setEmail(dataUpdate.email);
      setRole(dataUpdate.role);
      setUsername(dataUpdate.username);
      setImage("");
      if (dataUpdate.image)
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  }, [dataUpdate]);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
    // console.log(e.target?.files[0]?.name);
  };
  const handleSubmitCreateUser = async () => {
    // validate input
    // call api & submit data

    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    if (data?.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListUser();
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                disabled
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">
                Role
              </label>
              <select
                id="inputState"
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="lable-upload-img" htmlFor="labelUpload">
                <FcPlus />
                <span>Upload File Image</span>
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmitCreateUser(e)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
