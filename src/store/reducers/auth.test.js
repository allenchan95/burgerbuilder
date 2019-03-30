import reducer from './auth' ;
import * as actionTypes from '../actions/actionType';

describe('auth reducer',()=>{
	it('should return the inital state',() => {
		expect(reducer(undefined,{})).toEqual({
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
		})
	});

	it('should store the token upon login',()=>{
		expect(reducer(
				{
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
				}

			,{
				type: actionTypes.AUTH_SUCCESS,
				idToken:'token',
				userId:'id'
			})).toEqual({
				token :'token',
				userId : 'id',
				error: null,
				loading: false,
				authRedirectPath : '/',
				email:null,
				name:null,
				street:null,
				zipCode:null,
				country:null
		})

	})



});