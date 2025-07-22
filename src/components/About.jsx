import React from "react";
// import User from './User'
import ClassUser from "./ClassUser";

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
