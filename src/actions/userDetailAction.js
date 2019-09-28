
// Action for getting user details
export const userDetailAction = (value) => dispatch => {
    dispatch({
        type: 'GET_USER_DETAIL',
        payload: value
    })
}

// Action for Adding new details
export const userAddAction = (value) => dispatch => {
    dispatch({
        type: 'POST_ADD',
        payload: value
    })
  }

//Action for changing user detail
export const userChangeAction = (value) => dispatch => {
    dispatch({
        type: 'CHANGE_DETAIL',
        payload: value
    })
  }

//Action for deleting user detail
export const userDeleteAction = (value) => dispatch => {
    dispatch({
        type: 'DELETE_DETAIL',
        payload: value
    })
  }