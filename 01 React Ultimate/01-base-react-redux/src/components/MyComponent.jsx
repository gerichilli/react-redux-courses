import React from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfo from "./AddUserInfo";
class MyComponent extends React.Component {
  state = {
    listUsers: [
      {
        id: 1,
        name: "React",
        address: "Lalala",
        age: 20,
      },
      {
        id: 2,
        name: "Vue",
        address: "FFF",
        age: 20,
      },
      {
        id: 3,
        name: "Angular",
        address: "FFF",
        age: 18,
      },
    ],
  };

  handleAddNewUser = (newUser) => {
    this.setState({ listUsers: [newUser, ...this.state.listUsers] });
  };

  handleDeleteUser = (userId) => {
    this.setState({ listUsers: this.state.listUsers.filter((user) => user.id !== userId) });
  };
  render() {
    return (
      <>
        <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
        <DisplayInfo listUsers={this.state.listUsers} handleDeleteUser={this.handleDeleteUser} />
      </>
    );
  }
}

export default MyComponent;
