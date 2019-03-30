import React, {useState}from 'react';
import  './Order.css';
import Button from '../../components/UI/Button/Button';
const order = (props) => {
	const [showOrderData,setShowOrderData] = useState(false);
	const [btnType,setbtnType] = useState(true);
	const showOrderClick = () => {
		setShowOrderData(!showOrderData)
		setbtnType(!btnType)
	}
	const ingredients = [] ;
	for (let ingredientName in props.ingredients){
		ingredients.push({
			name: ingredientName,
			amount:props.ingredients[ingredientName]
		});
	}
	const ingredientsOutput = ingredients.map(ig =>{
		return <span style={{textTransform: 'capitalize', display:'inline-block' , margin:'0 8px', border:'1px solid #ccc', padding:'5px'}} key={ig.name}>{ig.name} ({ig.amount})</span>
	});
	const orderData = [];
	for (let data in props.orderData){
		orderData.push({
			name: data,
			value: props.orderData[data]
		});
	}
		const orderDataOutput = orderData.map(order =>{
		return <p><span style={{textTransform: 'capitalize', display:'inline-block' , margin:'0 8px', border:'1px solid #ccc', padding:'5px'}} key={order.name}>{order.name}:<strong> ({order.value})</strong></span></p>
	});
	let btnTypeString = '';
	let ButtonString = '';
	if(btnType){
		btnTypeString = 'Success';
		ButtonString = 'SHOW DETAIL';
	}else{
		btnTypeString = 'Danger';
		ButtonString = 'Hide DETAIL'
	}
	return(
			<div className="Order OrderOpen">
				<p>Ingredients :{ingredientsOutput}</p>
				<Button btnType={btnTypeString} clicked={showOrderClick}>{ButtonString}</Button>
				{	showOrderData	? <p>OrderData :{orderDataOutput}</p> :null
					}
				
				<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
			</div>
		)

	}

export default order;