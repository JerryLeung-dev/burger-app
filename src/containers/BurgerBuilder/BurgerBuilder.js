import React, {Component} from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount () {
        //append .json to make it work
        axios.get('https://react-my-bugger-7b8f8.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error:true});
        });
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=> {
                        return sum + el;
                    },0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        //prevents the count becomes negative
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Continue!');
        // Firebase uses same structure as MongoDB, we don't actually have
        // tables, but we just have json nested structure and if you send 
        //a request to the firebase URL like '/order', its gonna create a node and store the data beneath that node
        
        //the order is about to get sent, so set loading to true
        // this.setState({loading: true});
        // const order = {
        //     //in real app we have to recalculate the price in the server
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Jerry Leung',
        //         address: {
        //             street: 'Harnett Avenue',
        //             suburb: 'Marrickville',
        //             city: 'Sydney'
        //         },
        //         email: 'luongvidu@gmail.com'
        //     },
        //     deliveryMethod : 'express'
        // }
        // axios.post('/orders.json', order)
        //     //Either the response or error is back, we would want to stop display the loading spinner
        //     //lecture 182 from 7:08 onwards explain why the spinner doesn't appear
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false});         
        //     })
        //     .catch(error => this.setState({loading: false, purchasing: false}));
        
        
        //Sending query. Using encodeURIComponent and join to form a query
        //Then use this.props.history.push and send it via search key
        const query= [];
        for (let i in this.state.ingredients) {
            //watch tutorial link about what is endoing URI and why need to do that
            query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = query.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    render() {
        //disabledInfo on render because this code should ren (refresh/recalculate)
        //everytime the render method invokes
        //Meaning whenver the state>ingredients is updated
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients){
            burger = (
                <>
                    <Burger ingredients ={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price = {this.state.totalPrice}
                    />
                </>
            );
            orderSummary = <OrderSummary 
                            ingredients = {this.state.ingredients}
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler}
                            price={this.state.totalPrice.toFixed(2)} />;
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

export default withErrorHandler(BurgerBuilder, axios)