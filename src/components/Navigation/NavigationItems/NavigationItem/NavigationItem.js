import React from 'react';
import { NavLink ,withRouter} from 'react-router-dom';
import './NavigationItem.css';

const navigationItem = ( props ) =>{ 
       const onProfileButtonClicked = () =>{
           window.location.href = '/profile';
       } 
       const onLogoutButtonClicked = () =>{
            window.location.href = '/logout';
       }
return(


     <li className="NavigationItem"> 
     { props.isToolbar? 
            <NavLink
                 to='/profile'
                 activeClassName="active">
            <div className="dropdown">    
              <img src="http://www.esek.org.gr/images/ESET/eset_user.png"
                className="img"  alt="avatar" />
                  <div className="dropdownContent">
                    <button className='NavigationItemButton' onClick={onProfileButtonClicked} >Profile</button>
                    <button className='NavigationItemButton' onClick={onLogoutButtonClicked} > Logout</button>
                </div>
            </div>
              
            </NavLink>
           :  
                    <NavLink 
                        to={props.link} 
                        exact={props.exact}
                        activeClassName="active">
                         {props.children }
                    </NavLink>
                
        }
        </li>
    )
}

export default  withRouter(navigationItem);