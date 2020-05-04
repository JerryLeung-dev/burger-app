import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            summary = (
                <>
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                            component={ContactData} 
                    />
                </>
            );
        }
        return summary
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}
//if mapStateToProps is not necessary, put null in the first argument
export default connect(mapStateToProps)(Checkout)