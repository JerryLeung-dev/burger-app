import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreators from '../../store/actions/index';


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }

    state = {
        purchasing: false,
        loading: false,
        error: null
    }

    // componentDidMount () {
    //     //append .json to make it work
    //     axios.get('https://react-my-bugger-7b8f8.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ingredients: response.data});
    //     })
    //     .catch(error => {
    //         this.setState({error:true});
    //     });
    // }
    
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=> {
                        return sum + el;
                    },0);
       return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Continue!');      
        //Sending query. Using encodeURIComponent and join to form a query
        //Then use this.props.history.push and send it via search key

        this.props.history.push('/checkout');
    }
    
    render() {
        //disabledInfo on render because this code should ren (refresh/recalculate)
        //everytime the render method invokes
        //Meaning whenver the state>ingredients is updated
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ings){
            burger = (
                <>
                    <Burger ingredients ={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price = {this.props.price}
                    />
                </>
            );
            orderSummary = <OrderSummary 
                            ingredients = {this.props.ings}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler}
                            price={this.props.price.toFixed(2)} />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))