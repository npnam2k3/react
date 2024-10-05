import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let data = await getDataQuiz(quizId);
    console.log(data);
  };
  return <div>DetailQuiz</div>;
};
export default DetailQuiz;
