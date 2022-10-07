import { useState } from "react";

function AddUserInfo({ handleAddNewUser }) {
  const [user, setUser] = useState({
    name: "",
    address: "",
    age: 20,
  });

  function handleOnChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: user.name,
      address: user.address,
      age: user.age,
    });
  }

  return (
    <div>
      My name is {user.name} and I am {user.age} years old.
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="name">
            Name: <input type="text" name="name" id="name" value={user.name} onChange={handleOnChange} />
          </label>
        </div>
        <div>
          <label htmlFor="address">
            Address:
            <input type="text" name="address" id="address" value={user.address} onChange={handleOnChange} />
          </label>
        </div>
        <div>
          <label htmlFor="age">
            Ages: <input type="number" name="age" id="age" value={user.age} onChange={handleOnChange} />
          </label>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddUserInfo;
