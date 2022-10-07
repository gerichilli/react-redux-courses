import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "",
    address: "",
    age: 20,
  };

  handleClick = (event) => {
    console.log(event);
    // Auto merge state (react class)
    this.setState({ name: "ReactJS", age: Math.floor(Math.random() * 100 + 1) });
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      address: this.state.address,
      age: this.state.age,
    });
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I am {this.state.age} years old.
        <button onClick={this.handleClick}>Click me</button>
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <label htmlFor="name">
              Name: <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleOnChange} />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Address:
              <input
                type="text"
                name="address"
                id="address"
                value={this.state.address}
                onChange={this.handleOnChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="age">
              Ages: <input type="number" name="age" id="age" value={this.state.age} onChange={this.handleOnChange} />
            </label>
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfo;
