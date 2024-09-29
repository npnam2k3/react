import React from "react";
class AddUserInfor extends React.Component {
  state = {
    name: "",
    age: "",
    address: "HN",
  };
  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };
  render() {
    return (
      <div>
        Name: {this.state.name} and Age: {this.state.age}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <label>Your name: </label>
          <input
            value={this.state.name}
            type="text"
            onChange={(e) => {
              this.handleChangeName(e);
            }}
          />
          <label>Your age: </label>
          <input
            value={this.state.age}
            type="text"
            onChange={(e) => {
              this.handleChangeAge(e);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfor;
