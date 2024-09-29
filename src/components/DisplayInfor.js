import React, { useState } from "react";
import "./DisplayInfo.scss";
// class DisplayInfor extends React.Component {
//   handleOnclick = () => {
//     this.setState({
//       isShow: !this.state.isShow,
//     });
//   };
//   handleDelete = (userId) => {
//     this.props.handleDeleteUser(userId);
//   };
//   state = {
//     isShow: true,
//   };
//   render() {
//     const { listUser } = this.props;
//     return (
//       <div className="display-infor-container">
//         <div>
//           <button onClick={(e) => this.handleOnclick(e)}>
//             {this.state.isShow ? "Hide" : "Show"}
//           </button>
//         </div>
//         {this.state.isShow && (
//           <div>
//             {listUser.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age < 18 ? "red" : "green"}>
//                   <div>My name's {user.name}</div>
//                   <div>My age's {user.age}</div>
//                   <div>
//                     <button
//                       onClick={(e) => {
//                         this.handleDelete(user.id);
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShow, setShowHide] = useState(true);
  const handleOnclick = () => {
    setShowHide(!isShow);
  };
  const handleDelete = (userId) => {
    props.handleDeleteUser(userId);
  };
  return (
    <div className="display-infor-container">
      <div>
        <button onClick={(e) => handleOnclick(e)}>
          {isShow ? "Hide" : "Show"}
        </button>
      </div>
      {isShow && (
        <div>
          {listUser.map((user) => {
            return (
              <div key={user.id} className={+user.age < 18 ? "red" : "green"}>
                <div>My name's {user.name}</div>
                <div>My age's {user.age}</div>
                <div>
                  <button
                    onClick={(e) => {
                      handleDelete(user.id);
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
};
export default DisplayInfor;
