import * as actionTypes  from '../actions/actionType';
import {updateObject} from '../../shared/utility';
const initialState = {
	token :null,
	userId : null,
	error: null,
	loading: false,
	authRedirectPath : '/',
	email:null,
	name:null,
	street:null,
	zipCode:null,
	country:null
};
const authStart = (state,action) =>{
	return updateObject(state,{ 
		error: null,
		loading:true,
		email:null,
		name:null,
		street:null,
		zipCode:null,
		country:null});
}

const authSuccess = (state,action) => {
	return updateObject(state,{ 
		token: action.idToken,
		userId:action.userId,
		error:null,
		loading:false
		
	});
}

const authFail = (state,action) => {
	return updateObject(state,{ 
		error : action.error,
		loading:false
	});
}
const authLogout = (state,action) => {
	return updateObject(state,{ 
		token : null,
		userId : null,
		error: null,
		email:null,
		name:null,
		street:null,
		zipCode:null
	});
}
const setAuthRedirect = (state,action) => {
	return updateObject(state, {authRedirectPath: action.path})
}

const setContact = (state,action) => {
	return updateObject(state, {
		street: action.street,
		name: action.name,
		zipCode:action.zipCode,
		country:action.country,
		email:action.email
	})
}


const reducer = (state= initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state,action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
		case actionTypes.AUTH_FAIL : return authFail(state,action);
		case actionTypes.AUTH_LOGOUT : return authLogout(state,action);
		case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirect(state,action);
		case actionTypes.AUTH_SET_CONTACT_DATA : return setContact(state,action);
		default:
			return state;
	}
}
export default reducer;