import React, { useState } from "react";

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  return (
    <div>
      Name: {name} and Age: {age}
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <label>Your name: </label>
        <input
          value={name}
          type="text"
          onChange={(e) => {
            handleChangeName(e);
          }}
        />
        <label>Your age: </label>
        <input
          value={age}
          type="text"
          onChange={(e) => {
            handleChangeAge(e);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddUserInfor;
