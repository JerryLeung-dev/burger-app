import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    //..css animation
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className ={attachedClasses.join(' ')}>
                {/* Wrap the Logo with a div, assign the class 
                    inside the component which import Logo  */}
                <div className={classes.Logo}>
                    <Logo />
                </div>       
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </>

    );
};

export default sideDrawer