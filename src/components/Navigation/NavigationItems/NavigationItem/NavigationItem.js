import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
//  but keep in mind that css modules will actually take our class names here and convert them into unique
// class names.
// Therefore when we set up active here in css, it won't come out as active,
// it will have some hash attached to it,
// it will be unique.
// Therefore active class attached at runtime by nav link will not match our active class.
// We can easily fix that though, that nav link element has one extra property we can set up,
// we can set our own active class name as you learned.


// and you see we are on orders, it is active but the first link also is still active.
// This of course is also active due to the way this nav link interprets the active route.
// Keep in mind that the to path here is what determines whether this is the active route or not and it's
// treated as a prefix as learned.
// So as long as our current paths starts with this path here, this link is treated to be active.
// And for just slash every route starts with that.
// So we can simply fix this by adding the exact route here

    <li className={classes.NavigationItem}>
        <NavLink 
            exact={props.exact}
            activeClassName={classes.active}
            to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem