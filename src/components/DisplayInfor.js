import React from "react";

class DisplayInfor extends React.Component {
  handleOnclick = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  state = {
    isShow: true,
  };
  render() {
    const { listUser } = this.props;
    return (
      <div>
        <div>
          <button onClick={(e) => this.handleOnclick(e)}>
            {this.state.isShow ? "Hide" : "Show"}
          </button>
        </div>
        {this.state.isShow && (
          <div>
            {listUser.map((user) => {
              return (
                <div key={user.id} className={user.age < 18 ? "red" : "green"}>
                  <div>My name's {user.name}</div>
                  <div>My age's {user.age}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
