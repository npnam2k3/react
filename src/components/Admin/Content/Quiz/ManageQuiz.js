import { useState } from "react";
import "./manageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState(null);

  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    // validate
    if (!name || !description) {
      toast.error("Name/ description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setDescription("");
      setName("");
      setImage(null);
      setType("");
      let imageValue = document.getElementById("imageFile");
      imageValue.value = "";
    } else {
      toast.error(res?.EM);
    }
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="title">Manage Quizzes</div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add new quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name: </label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description: </label>
                </div>
                <div className="my-3">
                  <Select
                    options={options}
                    placeholder={"Quiz type ..."}
                    value={type}
                    defaultValue={type}
                    onChange={setType}
                  />
                </div>
                <div className="more-action">
                  <label className="mb-2">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-detail">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="title">Update Q/A Quiz</div>
          </Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="title">Assign to User</div>
          </Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
