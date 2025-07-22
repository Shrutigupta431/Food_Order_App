import React from "react";
import userContext from "../utils/userContext";
class ClassUser extends React.Component {
    constructor(props){
        super(props);

        this.state={
             userInfo:{
                name: 'Shruti',
                location:'Indore'
             }
        }
    }
   async componentDidMount(){ // used to make an API call
   const data = await fetch("https://api.github.com/users/akshaymarch7");
   const json = await data.json();
  //  console.log(json);

   this.setState({
    userInfo:json,
   })

  //  this.timer = setInterval(()=>{
  //   console.log("Clicked Timer ")
  //  },1000)
        console.log("Child Mounted")
      }
      componentDidUpdate(){
        // console.log("Component Updated")
      }
      componentWillUnmount() {
  console.log("Component is unmounting");
  // clearInterval(this.timer);
}

    render(){
        const {name,location,avatar_url} = this.state.userInfo;
        return (
            <div className='user-card'>
                <img src={avatar_url} />
                <h4>Name:  {name}</h4>
                <div>
                  LoggedInUser:
                  <userContext.Consumer>
                 {({loggedInUser})=> <h1 className="text-lg font-bold">{loggedInUser}</h1>}
                  </userContext.Consumer>
                </div>
                <h5>Address:{location}</h5>
                <h6>Contact Us : shru@123gmail.com</h6>
        
            </div>
          )
    }
}
export default ClassUser;