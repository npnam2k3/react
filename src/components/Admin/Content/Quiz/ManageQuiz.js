import { useState } from "react";
import "./manageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("EASY");

  const handleChangeFile = (e) => {};

  return (
    <div className="quiz-container">
      <div className="title">Manage Quizzes</div>
      <hr />
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
            />
          </div>
          <div className="more-action">
            <label className="mb-2">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail">Table</div>
    </div>
  );
};

export default ManageQuiz;
