import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./detailQuiz.scss";
import Question from "./Question";

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const handleClickPrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleClickNext = () => {
    if (dataQuiz && index + 1 < dataQuiz?.length) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    // console.log(res);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index == 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
            // console.log("Item answers: ", item.answers);
          });
          // console.log("Check value: ", value);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      // console.log(data);
      setDataQuiz(data);
    }
  };
  console.log("Check data quiz: ", dataQuiz);
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />

        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button
            className="btn btn-secondary"
            onClick={() => handleClickPrev()}
          >
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleClickNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuiz;
