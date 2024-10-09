import { useEffect, useState } from "react";
import "./QuizQA.scss";
import Select from "react-select";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataPreviewImage, setDataPreviewImage] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchApiQuiz();
  }, []);

  const fetchApiQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const handleAddRemoveQuestion = (type, questionId) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== questionId);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let indexQuestion = questionsClone.findIndex(
        (item) => item.id === questionId
      );
      let answers = questionsClone[indexQuestion].answers.filter(
        (answer) => answer.id !== answerId
      );
      questionsClone[indexQuestion].answers = answers;
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "INPUT") {
              answer.description = value;
            }
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    //validate questions/ answers
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // validate question
    let isValidQuestion = true;
    let indexQ = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ = i;
        break;
      }
    }
    if (!isValidQuestion) {
      toast.error(`Not empty Question ${indexQ + 1}`);
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestion = i;
      if (!isValidAnswer) break;
    }
    if (!isValidAnswer) {
      toast.error(
        `Not empty Question: ${indexQuestion + 1} 
        - Answers: ${indexAnswer + 1}`
      );
      return;
    }

    // submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // submit answers
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create questions and answers succeed");
    setQuestions(initQuestion);
  };
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      setDataPreviewImage({
        title: questionsClone[index].imageName,
        url: URL.createObjectURL(questionsClone[index].imageFile),
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-5">
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className={`form-control`}
                      placeholder=""
                      value={question.description}
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Question{index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleOnChangeFileQuestion(question.id, e)
                      }
                    />
                    <span>
                      {question?.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD")}>
                      <AiFillPlusCircle className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <AiFillMinusCircle className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id, "")
                            }
                          >
                            <AiFillPlusCircle className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiFillMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
      {isPreviewImage && (
        <Lightbox
          onClose={() => setIsPreviewImage(false)}
          image={dataPreviewImage.url}
          title={dataPreviewImage.title}
        ></Lightbox>
      )}
    </div>
  );
};

export default QuizQA;
