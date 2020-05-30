import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger =(props) => {
    //complicated algoritm, see lecture 159 to revive the whole concept
    let transformedIngredients = Object.keys(props.ingredients) //['salad','bacon','cheese','meat'] //get an array of all the keys
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { 
        //return a new array that has underfined elements. The length of array equals to the value of igKey
        //map through each undefined element ( the name of value doesn't matter, the index  i does)
            return <BurgerIngredient key={igKey + i} type={igKey} />
        //each undefined ( blank ) element returns a jsx element.
        });
    })
    .reduce((arr,el)=> {
        return arr.concat(el);
    },[]);

    if (transformedIngredients.length === 0 ) {
        transformedIngredients = <p style={{'color':'#69717b'}}>Please start adding ingredients!</p>
    }
    return(
        <div className ={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default withRouter(burger)