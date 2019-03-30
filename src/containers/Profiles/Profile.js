import React from 'react';

import ContactData from './ContactData/ContactData';
import Person from './Profile/Profile';
import Modal from './Profile/Modal';

class Profile extends React.Component {
	state = {
		isProfile: true,
		showModal: false,
		Modalstyle : "Modal ModalClosed",
		ProfileStyle: "Profile ProfileOpen", 

	}


	onButtonClick = () =>{
		if(this.state.ProfileStyle === "Profile ProfileOpen" ){
			this.setState( {isProfile:!this.state.isProfile , ProfileStyle:"Profile ProfileClosed"});
		}else{
			this.setState( {isProfile:!this.state.isProfile , ProfileStyle:"Profile ProfileOpen"});
		}
	}

	onShowModal = () =>{
		this.setState( {showModal:!this.state.showModal, Modalstyle : "Modal ModalOpen" });
	}
	onCloseModal = () => {
		this.setState( {showModal:false , Modalstyle : "Modal ModalClosed"});
	}

	render(){
		let component = '';

		if(this.state.isProfile){
			component = <Person  style={this.state.ProfileStyle} show={this.state.isProfile} clicked={()=>this.onButtonClick()}/> 

		}else {
			component = <ContactData clicked={()=>this.onButtonClick()} showModal={()=>this.onShowModal()} /> 
		}
		return (
			<div>
				<Modal show={this.state.showModal} style={this.state.Modalstyle} closed={()=>this.onCloseModal()}/>
			 	{component}
			</div>
			);
	}

}

export default Profile;