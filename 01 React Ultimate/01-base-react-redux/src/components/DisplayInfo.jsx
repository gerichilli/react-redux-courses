import { useState, useEffect } from "react";
import "./DisplayInfo.scss";

// class DisplayInfo extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("Call Constructor");
//   }

//   state = {
//     display: true,
//   };

//   componentDidMount() {
//     console.log("Component did mount");
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log("Component did update", this.props, prevProps);
//     if (this.props.listUsers !== prevProps.listUsers) {
//       console.log(`you got ${this.props.listUsers.length} users`);
//     }
//   }

//   handleShow = () => {
//     this.setState((prev) => ({
//       display: !prev.display,
//     }));
//   };

//   render() {
//     console.log("Render");
//     const { listUsers } = this.props;
//     return (
//       <div className="display-info-container">
//         <button onClick={this.handleShow}>{this.state.display ? "Hide" : "Show"}</button>
//         {this.state.display && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>My name is {user.name}</div>
//                   <div>Address {user.address}</div>
//                   <div>Ages {user.age}</div>
//                   <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
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

function DisplayInfo(props) {
  const { listUsers } = props;
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    console.log("call useEffect");
  }, [listUsers]);

  function handleShow() {
    setDisplay(!display);
  }

  return (
    <div className="display-info-container">
      <button onClick={handleShow}>{display ? "Hide" : "Show"}</button>
      {display && (
        <div>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>My name is {user.name}</div>
                <div>Address {user.address}</div>
                <div>Ages {user.age}</div>
                <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayInfo;
