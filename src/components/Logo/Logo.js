import React from 'react';
import {withRouter} from 'react-router-dom';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
	const onIconClicked =() =>{
		props.history.push('/');
	}
	return (
	    <div className={classes.Logo} style={{height: props.height}}>
	        <img src={burgerLogo} alt="MyBurger"  onClick={()=>onIconClicked()}/>
	    </div>
);
}

export default withRouter(logo);