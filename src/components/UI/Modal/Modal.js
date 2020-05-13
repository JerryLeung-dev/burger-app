import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    //This could be a functional component. doesn't have to be a class
    shouldComponentUpdate ( nextProps, nextState) {
        // for the second condition check lecture 182 from 7:08 onwards
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render() {
        return (
            <>
            <Backdrop show={this.props.show} clicked ={this.props.modalClosed} />
            <div 
                className ={classes.Modal}
                style={{
                    // transformY move the modal out the screen in the above direction 
                    transform: this.props.show ? 'translateY(0)' :'translateY(-100vh)', 
                    opacity: this.props.show ? '1' :'0'
                }}>
                {this.props.children}
            </div>
        </>
        );
    }
}


export default Modal;