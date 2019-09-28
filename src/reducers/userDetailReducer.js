
const initial = {
  userDetails: [],
}

export default (state = initial, action) => {
   // Reducer for user detail
    switch (action.type) {
      case 'GET_USER_DETAIL':
      return {
        userDetails: action.payload
      }
      
  
      case 'POST_ADD':
        let userDataTest = state.userDetails
        userDataTest.push(action.payload)
        return {
          userDetails: userDataTest
      }

      case 'CHANGE_DETAIL':
        let userData = state.userDetails
        let id = action.payload.id
        for(let i=0; i< userData.length;i++)
        {
            if(userData[i].id === id){
              userData[i] = action.payload
              break;
            }
        }
        

      return {
        userDetails: userData
        
      }

     
      case 'DELETE_DETAIL':
          let userDeleteData = state.userDetails
          
          userDeleteData.splice(action.payload,1)
          return {
          userDetails: userDeleteData
         }
      
     default:
      return state
    }
   
  }