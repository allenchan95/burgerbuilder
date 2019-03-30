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
                		placeholder: "Your Name"
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
                		placeholder: "Your Street"
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
                		placeholder: "Your Zipcode"
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
                		placeholder: "Your Country"
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
                		placeholder:"Your Contact Email"
                	},
                	value: this.props.email,
                	validation: {
                		required: true,
                        isEmail: true
                	},
                	valid: false,
                	touched: false
                }

		},
		formIsValid:false,
		loading: false,
        error :true

	}
    componentDidMount(){
        this.onCheckFormValid();
    }

	orderHandler = (event) => {
		
        this.setState( { loading: true } );

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            if(this.state.orderForm[formElementIdentifier].value!=='' && this.state.orderForm[formElementIdentifier].value!==null ){
                 formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }else{
                 if(formElementIdentifier === 'street'){
                     formData[formElementIdentifier] = this.props.street;
                 }
            }
        	   
            
        }

        const contact = {
            contactData: formData,
            userId: this.props.userId
        }

      
        axios.put( '/contacts/'+this.props.userId+'.json?auth='+ this.props.token, contact )
            .then( response => {
                this.setState( { loading: false,error:false } );
                this.props.onUpdatedContactData(
                    formData['name'],
                    formData['email'],
                    formData['street'],
                    formData['zipCode'],
                    formData['country'],
                    );
               if(response){
                   this.props.showModal();
               }
            } )
            .catch( error => {
                console.log(error)
                this.setState( { loading: false ,error: true} );
            } );


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
                <div >
                     {forElementsArray.map(formElement => (
                         <Input 
                             label={formElement.id}
                             key={formElement.id}
                             elementType={formElement.config.elementType}
                             elementConfig={formElement.config.elementConfig}
                             value={formElement.config.value? formElement.config.value : '' } 
                             invalid={!formElement.config.valid}
                             shouldValidate={formElement.config.validation}
                             touched={formElement.config.touched}
                             changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                         ))}
            
                     <Button btnType="Success" clicked={()=>this.orderHandler()} disabled={!this.state.formIsValid} >Update</Button>
                     <Button btnType="Danger" clicked={()=>this.props.clicked()}  >Return</Button>
                </div>
            ) ;
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className="ContactDataOpen">
            <div className={classes.ContactData}>
                 <h4> Update your contact data</h4>
                 {form}
            </div>
            </div>
            )
    }
}


const mapStateToProps = state =>{
    return{
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
        onUpdatedContactData:(name,email,street,zipCode,country)=> dispatch(actions.setContactData(name,street,zipCode,country,email))
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));