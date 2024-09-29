import React from "react";
class UserInfor extends React.Component {
  state = {
    name: "nam",
    age: 21,
    address: "HN",
  };
  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        Name: {this.state.name} and Age: {this.state.age}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            value={this.state.name}
            type="text"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </form>
      </div>
    );
  }
}

export default UserInfor;
