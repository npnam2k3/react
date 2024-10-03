import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalViewUser = (props) => {
  const { show, setShow, dataView } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-create-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>View detail user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-12">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{dataView.username}</td>
                    <td>{dataView.email}</td>
                    <td>{dataView.role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Avatar: </p>
            <div className="col-md-12 img-preview">
              {dataView.image ? (
                <img src={`data:image/jpeg;base64,${dataView.image}`} />
              ) : (
                <span>Avatar</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
