
import React, {Component} from 'react';
import DetailsDisplay from '../src/details-display';
// importing required packages
import { connect } from 'react-redux';
import { userDetailAction} from './actions/userDetailAction';
import './App.css';
// web template to get, update, delete and add new daetails consuming REST API
// initializing class 
class App extends Component {
constructor(props){
  super(props);
  this.state = {}
}

// init function
init(){
  this.fetchUserDetails();
}

// fetching data using GET Method
fetchUserDetails(){
  fetch("https://jsonplaceholder.typicode.com/posts/")
          .then(res => res.json())
          .then(
            (result) => {
              this.props.userDetailAction(result);
            },
    
         (error) => {
              this.setState({
                error
              });
            }

        )
        
}

//  calling init function inside componentDidMount function
componentDidMount(){
   this.init();
}


render(){
     
     const { userDetails } = this.props;
     return(
    <div>
      {userDetails.length ? 
      <DetailsDisplay
        display = { userDetails }
      /> : null } 

    </div>
    );
  }
}

//Reducer calls
const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
})
const mapDispatchToProps = dispatch => ({
  userDetailAction: (value) => dispatch(userDetailAction(value)),
 })


 export default connect(mapStateToProps, mapDispatchToProps)(App);