import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // const myInfo = this.props;
    const { listUser } = this.props;
    return (
      <div>
        {listUser.map((user) => {
          return (
            <div key={user.id}>
              <div>My name's {user.name}</div>
              <div>My age's {user.age}</div>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayInfor;
