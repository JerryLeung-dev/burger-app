import React from 'react';

import { Route, NavLink } from 'react-router-dom';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>

       <NavigationItem>Burger Builder</NavigationItem>
       <NavigationItem>Checkout</NavigationItem>
    </ul>
);

export default navigationItems