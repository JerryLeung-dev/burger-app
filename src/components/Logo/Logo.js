import React from 'react';
import classes from './Logo.module.css';

import burgerLogo from '../../assets/burger-logo/burger-logo.png';

const logo = (props) => (
    // Adjust the height of Logo by props => see Toolbar and SideDrawer
    <div className={classes.Logo} style= {{height: props.height}}>
        <img src={burgerLogo} alt='MyBurger'/>
    </div>
);

export default logo