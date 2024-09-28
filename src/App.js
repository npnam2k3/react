import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, decreaseCounter } from "./redux/action/counterAction";
import MyComponent from "./components/MyComponent";
import React from "react";

class App extends React.Component {
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
      <>
        <MyComponent></MyComponent>
        Name: {this.state.name} and Age: {this.state.age}
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
        </form>
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
