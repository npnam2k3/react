import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

const MyComponent = () => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "devil", age: 15 },
    { id: 2, name: "Phuong Nam", age: 21 },
    { id: 3, name: "nam nguyen", age: 22 },
  ]);
  const handleAddNewUser = (userObject) => {
    // console.log("Check data from parent: >>>", userObject);
    setListUser([userObject, ...listUser]);
  };

  const handleDeleteUser = (userId) => {
    let listUserClone = [...listUser];
    listUserClone = listUserClone.filter((user) => user.id !== userId);
    setListUser(listUserClone);
  };
  return (
    <>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <DisplayInfor listUser={listUser} handleDeleteUser={handleDeleteUser} />
    </>
  );
};

export default MyComponent;
