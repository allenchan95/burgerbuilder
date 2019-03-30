import * as actionTypes from './actionType';
import axios from '../../axios-orders';

export const purchaseBugerSuccess = (id,orderData) =>{
	return {
		type: actionTypes.PURCHASE_BUGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseBugerFail = (error) =>{
	return {
		type: actionTypes.PURCHASE_BUGER_FAIL,
		error:error
	}
}
export const purchaseBurgerStart =() =>{
	return{
			type:actionTypes.PURCHASE_BUGER_START
	};
}

export const purchaseBurger = (orderData,token) =>{
	return dispatch => {
			dispatch(purchaseBurgerStart());
		    axios.post( '/orders.json?auth='+ token, orderData )
            .then( response => {
                dispatch(purchaseBugerSuccess(response.data.name,orderData));
            } )
            .catch( error => {
              	dispatch(purchaseBugerFail(error))
            } );
	}
}
export const purchaseInit = () => {
	return {
		type:actionTypes.PURAHASE_INIT
	}
}

export const fetchOrdersSuccess = (orders) => {
	return{
		type: actionTypes.FETCH_OREDERS_SUCCESS,
		orders: orders
	}
}
export const fetchOrdersFail =(error) => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
		error:error
	}
}

export const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}
export const fetchOrders = (token,userId) => {
	return dispatch => {
		dispatch(fetchOrderStart());
			const queryParams= '?auth=' + token +'&orderBy="userId"&equalTo="'+ userId+'"';
			axios.get('/orders.json'+ queryParams )
			.then(res=>{

				const fetchedOrders = [];
				for (let key in res.data){
					fetchedOrders.push({
						...res.data[key],
						id: key
					});	
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	}
}