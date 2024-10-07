import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleCheckbox = (e, answerId, questionId) => {
    props.handleCheckbox(answerId, questionId);
  };
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer-${index}`} className="a-answer">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={answer.isSelected}
                    onChange={(e) =>
                      handleCheckbox(e, answer.id, data.questionId)
                    }
                  />
                  <label class="form-check-label">{answer.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
