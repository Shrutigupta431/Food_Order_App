import React from "react";
// import User from './User'
import ClassUser from "./ClassUser";
import userContext from "../utils/userContext";
class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent  Constructor");
  }
  componentDidMount() {
    console.log("Parent Mounted");
  }
  render() {
    console.log("Parent Render");
    return (
      <div>
        <h1>
          About
          {/* <User name={"Shruti Gupta (functional)"} /> */}
          <ClassUser
            name={"Shruti Gupta (Class)"}
            address={"Dehradun (Class)"}
          />
          <div>
            Logged In User: <userContext.Consumer>
              {/* {(data)=>console.log(data)} */}
              {({loggedInUser})=><h1>{loggedInUser}</h1>}
            </userContext.Consumer>
          </div>
        </h1>
      </div>
    );
  }
}

// function About() {
//   return (
//     <div><h1>
//       About
//       {/* <User name={"Shruti Gupta (functional)"} /> */}
//       <ClassUser  name={"Shruti Gupta (Class)"} address={"Dehradun (Class)"}/>
//       </h1></div>
//   )
// }

export default About;
