import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "React",
    address: "Lalala",
    age: 20,
  };

  handleClick = (event) => {
    console.log(event);
    console.log("My name is " + this.state.name);
  };

  handleOnMouseOver = (event) => {
    console.log(event);
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I am {this.state.age} years old.
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MyComponent;
