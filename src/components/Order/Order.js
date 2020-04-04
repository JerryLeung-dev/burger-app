import React from 'react';

import classes from './Order.module.css'

const order = (props) => {
    let editedIngredients = [];
    for( let ingredient in props.ingredients){
        if (props.ingredients[ingredient] === 0){
            delete props.ingredients[ingredient];
        } else {
            editedIngredients.push({
                name: ingredient,
                amount: props.ingredients[ingredient]});
        }
    }
    
    const ingredientOutput =editedIngredients.map(ig => {
        return (
         <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding:'5px',
                border: '1px solid #ccc'
                }}
            key={ig.name}> {ig.name} ({ig.amount})</span>
        );
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong> </p>
        </div>
    );
}

export default order