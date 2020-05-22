import React from 'react';

import classes from './BuildControl.module.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <button className={classes.Less}
                onClick={props.removed}
                disabled={props.disabled}><RemoveIcon style={{color: '#716e6e'}}/></button> 
        <div className={classes.Label}>{props.label}</div>     
        <button 
            className={classes.More} 
            onClick={props.added}><AddIcon style={{color: '#716e6e'}}/></button>    
    </div>
);

export default buildControl