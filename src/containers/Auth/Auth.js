import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';

import {checkValidity} from '../../shared/utility';
class Auth extends Component {
	state = {
		controls:{
			    email: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'email',
                		placeholder: 'Mail Address'
                	},
                	value: '',
                	validation: {
                		required: true,
                		isEmail:true
                	},
                	valid: false,
                	touched: false
                },			
                password: {
                	elementType: 'input',
                	elementConfig: {
                		type: 'password',
                		placeholder: 'Password'
                	},
                	value: '',
                	validation: {
                		required: true,
                		minLength: 6
                	},
                	valid: false,
                	touched: false
                }
		},
		isSignup: true
	}
	componentDidMount () {
		
		if ((!this.props.buildingBurger) && this.props.authRedirectPath !=='/' ){
			this.props.onSetAuthRedirectPath('/');
		}

	}
    // checkValidity = (value, rules) => {
    //     let isValid = true;
    //     if (!rules) {
    //         return true;
    //     }
        
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }

    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid;
    // }

	inputChangeHandler =(event, controlName) =>{
		const updatedControls = {
			...this.state.controls,
			[controlName]:{
				...this.state.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		}
		this.setState({controls:updatedControls})
	}
	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup}
		})
	}
	render(){
		const forElementsArray = [];
		for (let key in this.state.controls) {
			forElementsArray.push({
				id:key,
				config: this.state.controls[key]
			});
		}
		let form = forElementsArray.map(formElement =>(
			<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value} 
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
			))

		if (this.props.loading){
			form = <Spinner />
		}
		let errorMessage = null;

		if (this.props.error) {
			errorMessage =(
				<p> {this.props.error.message}</p>
				);
		}
		let authRedirect = null;

		if (this.props.isAuthenticated){
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return(
			<div className={classes.Auth}>
				<div>
					<h1>
						{!this.state.isSignup ? "SIGNIN" : "SIGNUP"}
					</h1>
				</div>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType='Success' >Submit</Button>
				</form>
					<Button 
						clicked={this.switchAuthModeHandler}
						btnType='Danger' >SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		loading : state.auth.loading,
		error : state.auth.error,
		isAuthenticated : state.auth.token !== null,
		buildingBurger :state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
		onSetAuthRedirectPath :(path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);