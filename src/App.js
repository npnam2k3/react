import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent";
import React from "react";
import UserInfor from "./components/UserInfor";
import DisplayInfor from "./components/DisplayInfor";

class App extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "devil", age: 20 },
      { id: 2, name: "Phuong Nam", age: 21 },
      { id: 3, name: "nam nguyen", age: 22 },
    ],
  };
  render() {
    return (
      <>
        <MyComponent></MyComponent>
        <UserInfor />
        {/* <DisplayInfor name="Admin" age={21} /> */}
        <DisplayInfor listUser={this.state.listUser} />
      </>
    );
  }
}

// const App = () => {
//   const count = useSelector((state) => state.counter.count);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello world!</p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// };

export default App;
