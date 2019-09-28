//importing the required packages 
import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import { userChangeAction , userAddAction, userDeleteAction} from './actions/userDetailAction';
import {  } from './actions/userDetailAction';
import AddIcon from './icons/Add.svg'

// initializing class
class DetailsDispaly extends Component{
    //initilizing constructor
    constructor(props){

        super(props);
        this.state = {
          showPutModal: false,
          show: false,
          title: '',
          body:'',
          activeUserId:''
        }
      }
 
// Displaying details using renderCardView method
  renderCardView(details, index){
    return(
          <div className="user" key={index}>
              <div className="user-details"><strong>Id: </strong>{details.id}</div><hr/>
              <div className="user-details"><strong>User Id: </strong>{details.userId}</div><hr/>
              <div className="card-salary"><strong>Title: </strong>{details.title}</div><hr/>
              <div className="card-age"><strong>body: </strong>{details.body}</div><hr/>
              <div className="button-card">
              <Button
                variant="primary"
                onClick={() => this.openPutDelModal(details.id)}
                >
                  {<strong>Change Details</strong>}
              </Button>
              <Button onClick={this.delete}>Delete</Button>
              </div>
          </div>
      );
      }
    
     // function to hold user entered values, in the Modal
     onChange = (event) => {
      const value = event.target.value
      const name = event.target.name
      this.setState({ [name]: value})
    }    
  
    // function to open the global Modal design
    openPostModal = () => { 
      this.setState({ 
          show: true,
      });
    }
    
    // function to close the global Modal
    closePostModal = () =>{
      this.setState({ 
        show: false,
        title:'',
        activeUserId : '',
        body:''
        });
    }
  
    // function to Add new details using POST API
    add = () => {
      const{ title, activeUserId, body } = this.state
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: title,
        body: body,
        userId: activeUserId
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    })

    .then(response => response.json())
    .then(result => {
        this.props.userAddAction(result);
        this.setState({
          show:false
        }
        );
    })
    }  
    // funtion for the global modal
    postModal(){
      const { show, title, body, activeUserId } = this.state
        return(
          <div>
              <Modal show={show} onHide={this.closePostModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>Add Information</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <form>
                         <Form.Control type='text' name='title' value={title} 
                          placeholder='Title' onChange={this.onChange}/><br/>
                         <Form.Control as='textarea' rows='3'  name='body' value={body} 
                          placeholder='Body' onChange={this.onChange}/><br/>
                          <Form.Control type ='number'  name='activeUserId' value={activeUserId} 
                           placeholder='Id' onChange={this.onChange}/>
                      </form>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={this.add}>Add</Button>
                      <Button onClick={this.closePostModal}>close</Button>
                  </Modal.Footer>
              </Modal>
         </div>
      );
  }

    //function to open inline Modal
    openPutDelModal = (id) => {
    this.setState({
      showPutModal: true,
      activeId: id
    })
    }
    
    //function to close inline Modal
     closePutDelModal = () =>{
      this.setState({ 
        showPutModal: false,
        title:'',
        activeId : '',
        body:''
        });
     }

     // function to change the details using PUT API
     change = () =>{
      const{ title, activeId, activeUserId, body } = this.state
      fetch(`https://jsonplaceholder.typicode.com/posts/${activeId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: activeUserId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(result => {
        this.props.userChangeAction(result);
        this.setState({
          showPutModal:false,
          title:'',
          activeUserId : '',
          body:''
        }
        );
    })
  }
  


  // function for the inline modal 
  putDelModal(){
        const { showPutModal, title, body, activeUserId } = this.state
          return(
            <div>
              <Modal show={showPutModal} onHide={this.closePutDelModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                          <Form.Control type='text' name='title' value={title} 
                            placeholder='Title' onChange={this.onChange}/><br/>
                          <Form.Control as='textarea' rows='3'  name='body' value={body} 
                            placeholder='Body' onChange={this.onChange}/><br/>
                          <Form.Control type ='number'  name='activeUserId' value={activeUserId} 
                            placeholder='Id' onChange={this.onChange}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.change}>Change</Button>
                        <Button onClick={this.closePutDelModal}>close</Button>
                    </Modal.Footer>
                </Modal>
          </div>
        );
     }

     
    // function to delete the detail
    delete = () => {
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE'
    })
    .then(response => response.json())
        .then(result => {
          this.props.userDeleteAction(result);
         
          this.setState({
            show:false
          }
          );
      })
    }

    

render(){
        const { display } = this.props
        const { show } = this.state
        const { showPutModal } = this.state
        
        return(
          <div>
                <div className="Push-new-card-button">
                  <strong className="icon-title">Add Card</strong>
                  <Button
                    variant="primary"
                    onClick={this.openPostModal}
                    
                    >
                      <img className="add-icon" src={AddIcon} alt='Add-New-Card'/>
                  </Button>
                  
                </div>
                <div className="flex-container">
                   {/* mapping renderCardView function */}
                  {display.map((details, index) => this.renderCardView(details, index))}
                </div>
                {show && this.postModal()}
                {showPutModal && this.putDelModal()}
         </div>
     );
    }          
}

//Reducer Calls
const mapStateToProps = state => ({
    
  })
  const mapDispatchToProps = dispatch => ({
    userAddAction: (value) => dispatch(userAddAction(value)),
    userChangeAction: (value) => dispatch(userChangeAction(value)),
    userDeleteAction: (value) => dispatch(userDeleteAction(value))
   })
  
  
export default connect(mapStateToProps, mapDispatchToProps)(DetailsDispaly);