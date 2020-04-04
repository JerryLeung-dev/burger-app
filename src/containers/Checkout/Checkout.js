import React, { Component} from 'react';

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
    state ={
        ingredients: null,
        price: 0
    }

    UNSAFE_componentWillMount(props) {
        //Retrivieving query params. Using URLSearchParams to retrieve 
        //params in the path,use loop params in .entries() and assign it to state property. 
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price =0;
        for (let param of query.entries()){
            // param[1] is a string, we convert it to number by adding +
            if(param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        };
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                // Pass the data between pages by using render() in route
                    render={(props)=> (<ContactData 
                                    ingredients={this.state.ingredients}
                                    price={this.state.price}
                                    //Passing history props to ContactData so we can use history.push
                                    {...props}
                                    />)}/>
            </div>
        );
    };
}

export default Checkout