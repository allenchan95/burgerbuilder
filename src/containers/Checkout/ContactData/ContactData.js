import React, { Component } from 'react';

import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {
	state = {
		orderForm:{
                name: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'text',
                		placeholder: 'Your Name'
                	},
                	value: this.props.name,
                	validation: {
                		required: true
                	},
                	valid: false,
                	touched: false
                },
                street:{
                	elementType: 'input',
                	elementConfig: {
                		type: 'text',
                		placeholder: 'Street'
                	},
                	value: this.props.street,
                	validation: {
                		required: true
                	},
                	valid: false,
                	touched: false
                },
                zipCode: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'text',
                		placeholder: 'Zip Code'
                	},
                	value: this.props.zipCode,
                	validation: {
                		required: true,
                		minLength:5,
                		maxLength:5

                	},
                	valid: false,
                	touched: false
                },
                country: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'text',
                		placeholder: 'Your Country'
                	},
                	value: this.props.country,
                	validation: {
                		required: true
                	},
                	valid: false,
                	touched: false
                },
                email: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'text',
                		placeholder: 'Your Email'
                	},
                	value: this.props.email,
                	validation: {
                		required: true,
                        isEmail: true
                	},
                	valid: false,
                	touched: false
                },
                deliveryMethod: {
                	elementType: 'select',
                	elementConfig: {
                		options: [
                			{value:'fastest', displayValue: 'Fastest'},
                			{value:'cheapest',displayValue:'Cheapest'}
                			]
                	},
                	value: 'fastest',
                	validation:{},
                	valid: true
  
     

                },
              
		},
		formIsValid:false
		// loading: false
	}

    componentDidMount(){
        this.onCheckFormValid();
    }
	orderHandler = (event) => {
		event.preventDefault();
        // this.setState( { loading: true } );

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
        	formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token);

	}

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = { 
			...updatedOrderForm[inputIdentifier] 
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm){
            if(updatedOrderForm[inputIdentifier].value){
                updatedOrderForm[inputIdentifier].valid = checkValidity(updatedOrderForm[inputIdentifier].value, updatedOrderForm[inputIdentifier].validation);
            }
            
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
	}
    onCheckFormValid= () =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
             if(updatedOrderForm[inputIdentifier].value){
                updatedOrderForm[inputIdentifier].valid = checkValidity(updatedOrderForm[inputIdentifier].value, updatedOrderForm[inputIdentifier].validation);
            }
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid});
    }


	render () {
		const forElementsArray = [];
		for (let key in this.state.orderForm) {
			forElementsArray.push({
				id:key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
				<form onSubmit={this.orderHandler}>
				 	{forElementsArray.map(formElement => (
				 		<Input 
				 			key={formElement.id}
                            label={formElement.id}
				 			elementType={formElement.config.elementType}
				 			elementConfig={formElement.config.elementConfig}
				 			value={formElement.config.value} 
				 			invalid={!formElement.config.valid}
				 			shouldValidate={formElement.config.validation}
				 			touched={formElement.config.touched}
				 			changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
				 		))}
			
				 	<Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
				</form>
			) ;
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				 <h4> Enter your contact data</h4>
				 {form}
			</div>
			)
	}
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token :state.auth.token,
        userId : state.auth.userId,
        email: state.auth.email,
        name: state.auth.name,
        zipCode : state.auth.zipCode,
        country : state.auth.country,
        street: state.auth.street
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));