import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "devil", age: 15 },
      { id: 2, name: "Phuong Nam", age: 21 },
      { id: 3, name: "nam nguyen", age: 22 },
    ],
  };
  handleAddNewUser = (userObject) => {
    // console.log("Check data from parent: >>>", userObject);
    this.setState({
      listUser: [userObject, ...this.state.listUser],
    });
  };

  handleDeleteUser = (userId) => {
    let listUserClone = [...this.state.listUser];
    listUserClone = listUserClone.filter((user) => user.id !== userId);
    this.setState({
      listUser: listUserClone,
    });
  };
  // JSX
  render() {
    return (
      <>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        {/* <DisplayInfor name="Admin" age={21} /> */}
        <DisplayInfor
          listUser={this.state.listUser}
          handleDeleteUser={this.handleDeleteUser}
        />
      </>
    );
  }
}

export default MyComponent;
