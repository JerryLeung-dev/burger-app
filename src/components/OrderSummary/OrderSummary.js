import React, {Component} from 'react';

import Button from '../UI/Button/Button';
 
class OrderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return(
            <>
            <h3 style={{color:'#6920B3'}}>Your Order</h3>
            <p>Your burger has the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{this.props.price}</strong></p>
            <p>Continue to check out?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </>
        );
    }
}



export default OrderSummary