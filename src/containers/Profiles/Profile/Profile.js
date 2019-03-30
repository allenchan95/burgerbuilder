import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import './Profile.css';


class Profile extends Component {


render () {
  
        return (

            <div className={this.props.style} >
                       <h1>{this.props.name}</h1>
                       <h4>Email: {this.props.email? this.props.email:'undefined'}</h4>
                       <p>ZipCode: {this.props.zipCode? this.props.zipCode:'undefined'}</p>
                       <p>Country: {this.props.country? this.props.country:'undefined'}</p>
                       <p>Street: {this.props.street? this.props.street:'undefined'}</p>
                       <Button  btnType="Success" clicked={this.props.clicked} >SHOW UPDATE FORM</Button>
                       <hr />
                      
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
       
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);