import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className ={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleCLicked} />
        {/* This class is actually from the Toolbar.module.css */}
        {/* Wrap the Logo with a div, assign the class 
                inside the component which import Logo  */}
        <div className ={classes.Logo}> 
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar