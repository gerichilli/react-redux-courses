import React from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfo from "./AddUserInfo";

function MyComponent() {
  const initialListUsers = [
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
  ];

  const [listUsers, setListUsers] = React.useState(initialListUsers);

  function handleAddNewUser(newUser) {
    setListUsers([newUser, ...listUsers]);
  }

  function handleDeleteUser(userId) {
    setListUsers(listUsers.filter((user) => user.id !== userId));
  }

  return (
    <>
      <AddUserInfo handleAddNewUser={handleAddNewUser} />
      <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </>
  );
}

export default MyComponent;
