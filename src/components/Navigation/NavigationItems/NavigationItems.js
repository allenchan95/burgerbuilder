import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/"  exact>Burger Builder</NavigationItem>
       {props.isAuthenticated 
       	 	? <NavigationItem link="/orders">Orders</NavigationItem>
       		: null
   		}
        {!props.isAuthenticated 
        	? <NavigationItem link="/auth">Authenticate</NavigationItem>
        	: null
        }
        {props.isAuthenticated && props.isSideDrawer
          ?<NavigationItem link='/profile'>Profile</NavigationItem>
          : null
        }
         {props.isAuthenticated && props.isSideDrawer
          ? <NavigationItem link="/logout">Logout</NavigationItem>
          : null
        }
        {props.isAuthenticated 
          ? <NavigationItem link='/profile' isToolbar={props.isToolbar} >
          </NavigationItem>
          :null
      }  
    </ul>
);


export default navigationItems;
