import React from "react";
import "./DisplayInfo.scss";
import logo from "../logo.svg";

class DisplayInfor extends React.Component {
  handleOnclick = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };
  handleDelete = (userId) => {
    this.props.handleDeleteUser(userId);
  };
  state = {
    isShow: true,
  };
  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
        {/* <img src={logo} /> */}
        <div>
          <button onClick={(e) => this.handleOnclick(e)}>
            {this.state.isShow ? "Hide" : "Show"}
          </button>
        </div>
        {this.state.isShow && (
          <div>
            {listUser.map((user) => {
              return (
                <div key={user.id} className={+user.age < 18 ? "red" : "green"}>
                  <div>My name's {user.name}</div>
                  <div>My age's {user.age}</div>
                  <div>
                    <button
                      onClick={(e) => {
                        this.handleDelete(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
