import {SET_MESSAGE, RESET_MESSAGE} from '../constants/actionTypes.js';
import {axiosTaget} from '../constants/axiosTaget.js';
import axios from 'axios';
import history from '../routes/history.js';
import {createActions} from 'redux-actions'


export const setMessage = {
	type: SET_MESSAGE,
	
}

export const resetMessage ={
	type: RESET_MESSAGE
}

export const reqRegister = {
	type: 'REQ_REGISTER'
}

export const resRegister = {
	type: 'RES_REGISTER'
}

export const errRegister = {
	type: 'ERR_REGISTER'
}

export const postRegister = (values) => dispatch => {
	console.log(values)
	dispatch(reqRegister);
	axios.post(axiosTaget+'/users/register',
			values
		)
		.then(response =>{
			console.log(response)
			dispatch(resRegister)
			history.push('/');
		})
		.catch((err) => { console.error(err);dispatch(errRegister) 
	}) ;
}

export const reqLogin = {
	type: 'REQ_LOGIN'
}

export const resLogin = {
	type: 'RES_LOGIN'
}

export const errLogin = {
	type: 'ERR_LOGIN'
}

export const reqAuth  = {
	type: 'REQ_AUTH'
}
export const completeAuth = username =>{
	return{
		type: 'COMPLETE_AUTH',
		username:username.userName		
	}

}
export const errAuth = {
	type: 'ERR_AUTH'
}

export const resLogOut = {
	type: 'RES_LOGOUT'
}

export const reqLogOut = () => (dispatch) => {
	dispatch(resLogOut);
	document.cookie = 'username=;  '+
	'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	alert('已登出')
	history.push('/shop');
	
}



export const postLogin = (values) => dispatch => {
	dispatch(reqLogin);
	console.log(values)
	axios.post(axiosTaget+'/users/login',
			values
		)
		.then(response =>{
			console.log(response)
			dispatch(resLogin)
			document.cookie="username="+response.data.token;
			dispatch(completeAuth(values))
		})
		// .then(dispatch(completeAuth))
		.catch((err) => { console.error(err);dispatch(errLogin) 
	}) ;


}

const validUserName = createActions({
	VALID_USER_NAME:{
		REQUEST:() => ({}),
		'RESPONSE':(userNameValid)=>({userNameValid}),
		'ERROR':(err)=>({err})		
	}
})

export const validUserNameApi = username => dispatch => {
	dispatch(validUserName.validUserName.request())
	axios.post(axiosTaget+'/users/usernamevalid', {username})
	.then(response => {
		console.log(response)
		dispatch(validUserName.validUserName.response(response.data.success))
	}).catch((err) => {
		console.log(err)
	})
	// dispatch(validUserName.validUserName.response(username))
}
