import React, {Component} from 'react';

import classes from './OrderSummary.module.css'
import Button from '../UI/Button/Button';
 
class OrderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return(
            <div className={classes.OrderSummary}>
                <h3>Your Order</h3>
                <p>Your burger has the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total price: <strong>{this.props.price}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </div>
        );
    }
}



export default OrderSummary