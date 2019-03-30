import React from "react";
import { NavLink } from 'react-router-dom';
import './error.css';
const errorPage = props => {
  return (
    <div className='error'>
  		<h1> Oops! Something went wrong , back to <NavLink to='/'>index</NavLink> </h1>
    </div>
  );
};

export default errorPage;