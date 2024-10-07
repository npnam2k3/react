import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log("Check res: ", res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  return (
    <>
      <div className="mt-3" style={{ fontSize: "24px", fontWeight: "600" }}>
        List Quizzes:{" "}
      </div>
      <table className="table table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`${index}-quiz`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button className="btn btn-warning mx-3">Edit</button>
                    <button className="btn btn-danger ">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
