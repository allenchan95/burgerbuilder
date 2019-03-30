import React, {Component} from 'react' ;

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';

import Page from '../../components/Page/Page';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import './Orders.css';

class Orders extends Component {
	// state={
	// 	orders: [],
	// 	loading:true
	// }
	state = {
		index:1,
		count: 5,
		disabled: false,
		pages:0

	}
	componentDidMount() {
		// axios.get('/orders.json')
		// 	.then(res=>{
		// 		const fetchedOrders = [];
		// 		for (let key in res.data){
		// 			fetchedOrders.push({
		// 				...res.data[key],
		// 				id: key
		// 			});
		// 		}
		// 		this.setState({loading:false,orders:fetchedOrders});
		// 	})
		// 	.catch(err => {
		// 		this.setState({loading:false});
		// 	});
		this.props.onFetchOrders(this.props.token,this.props.userId);


	}
	// onShowMoreClicked = () => {
	// 	const countTemp =  this.state.count+5;
	// 	if(this.props.orders.length < countTemp){
	// 		this.setState({
	// 			...this.state,
	// 			count: this.state.count+5,
	// 			disabled:true
	// 		})
	// 	}else{
	// 		this.setState({
	// 			...this.state,
	// 			count: this.state.count+5,
	// 			disabled:false
	// 		})
	// 	}
	// }
	  getCurrentPage = (currentPage) => {
        this.setState({
           ...this.state,
           index:currentPage
        })
    }

	render () {
		let orders = <Spinner />;
		let pages = null;
		if (!this.props.loading){
			orders =  this.props.orders.slice((this.state.index*5)-5, (this.state.index*5)).map(order =>(
							<Order 
								key={order.id}
								ingredients={order.ingredients}
								price={order.price}
								orderData={order.orderData}
								/>
						))
			pages = Math.ceil( this.props.orders.length/5);
			
		}
	
		return(
			<div>
				{orders.length> 0 ? orders : this.props.loading?  <Spinner /> :<div className='Message'><h1><strong>NO ORDER RECORD YET,LETS START TO MAKE SOME ORDERS!</strong></h1></div>}
				
				{pages?<div className=''> <Page pageConfig={{totalPage: pages}} pageCallbackFn={this.getCurrentPage}/></div> : null}
				


			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		orders : state.order.orders,
		loading : state.order.loading,
		token : state.auth.token,
		userId :state.auth.userId

	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
	}

}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));