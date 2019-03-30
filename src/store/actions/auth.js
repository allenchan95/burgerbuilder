import * as actionTypes from './actionType';
import axios from 'axios';
export const authStart = () => {
	return{
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token,userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken : token,
		userId :userId
	}
}
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error : error
	}
}
export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	return {
		type : actionTypes.AUTH_LOGOUT
	}
 }
export const checkAuthTimeout = (expirationTime) =>{
	return dispatch =>	{
		setTimeout(()=>{
			dispatch(logout());
		}, expirationTime * 1000)
	}
}

export const auth = (email,password , isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email:email,
			password:password,
			returnSecureToken :true,
			 
		}
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAXrU6Nlxlu3jibtiCMZQ8EpvVWZGzmC3w';
		if(!isSignup){
			url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAXrU6Nlxlu3jibtiCMZQ8EpvVWZGzmC3w'
		}
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('userId',response.data.localId);
                localStorage.setItem('expirationDate',expirationDate);
                axios.get( 'https://burgerbuilder-e577c.firebaseio.com/contacts/'+response.data.localId+'.json?auth='+ response.data.idToken)
                	     .then( res => {
		   				dispatch(setContactData(res.data.contactData.name, res.data.contactData.street,res.data.contactData.zipCode,res.data.contactData.country,res.data.contactData.email));
		            } )
		            .catch( error => {
		                
		            } )
  
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            	dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path : path
	}
}

export const setContactData = (name,street,zipCode,country,email) =>{
		return {
		type: actionTypes.AUTH_SET_CONTACT_DATA,
		name:name,
		street : street,
		zipCode :zipCode,
		country: country,
		email:email
	}
}
export const authCheckState = () =>{
	return dispatch =>{
		const token = localStorage.getItem('token');
		if (!token){
			dispatch(logout());
		}else{
			const expirationDate = new Date( localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()){
				dispatch(logout());
			}else{
				const userId = localStorage.getItem('userId');
                	axios.get( 'https://burgerbuilder-e577c.firebaseio.com/contacts/'+userId+'.json?auth='+ token)
                	     .then( res => {
		   				dispatch(setContactData(res.data.contactData.name, res.data.contactData.street,res.data.contactData.zipCode,res.data.contactData.country,res.data.contactData.email));
		            } )
		            .catch( error => {
		                
		            } )
                	
				dispatch(authSuccess(token,userId))
				dispatch(checkAuthTimeout( (expirationDate.getTime()- new Date().getTime() )/1000 ));
			}
		}

	};
}