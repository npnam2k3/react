import { useState } from "react";
import "./manageQuestion.scss";
import Select from "react-select";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const ManageQuestions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add question:</div>
        <div>
          <div className="question-content">
            <div className="form-floating description">
              <input type="text" className="form-control" placeholder="" />
              <label>Description</label>
            </div>
            <div className="group-upload">
              <label className="label-upload">Upload Image:</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <AiFillPlusCircle className="icon-add" />
              </span>
              <span>
                <AiFillMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input type="text" className="form-control" placeholder="" />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <AiFillPlusCircle className="icon-add" />
              </span>
              <span>
                <AiFillMinusCircle className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;
