import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


//Import hoc error Handler to handle axios request and response.
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
    }

        
     orderHandler = (event) => {
        event.preventDefault();
         // Firebase uses same structure as MongoDB, we don't actually have
        // tables, but we just have json nested structure and if you send 
        //a request to the firebase URL like '/order', its gonna create a node and store the data beneath that node
     
        //the order is about to get sent, so set loading to true
        //Add form data to the submission object
        // const order = {
        //     //in real app we have to recalculate the price in the server
        //     ingredients: this.props.ingredients,
        //     price: this.props.price,
            
        // }

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
        }
        const order = {
                //in real app we have to recalculate the price in the server
                ingredients: this.props.ings,
                price: this.props.price,
                orderData: formData,
                userId: this.props.userId
        }
        // axios.post('/orders.json', order)
        // //     //Either the response or error is back, we would want to stop display the loading spinner
        // //     //lecture 182 from 7:08 onwards explain why the spinner doesn't appear
        //     .then(response => {
        //        this.setState({loading: false});
        //        this.props.history.push('/')
        //     })
        //     .catch(error => this.setState({loading: false}));
        this.props.onBurgerOrder(order, this.props.token);
     }
    
    // assignErrorMessage(validBoolean, messageList, message){
    //     if(validBoolean === false) {
    //         if(messageList.indexOf(message) == -1){
    //             messageList.push(message); 
    //         }
    //     }
    //     if(validBoolean === true) {
    //         if(messageList.indexOf(message) !== -1){
    //             messageList.splice(messageList.indexOf(message), 1);
    //         }
    //     }
    //     this.setState({errorMessage: messageList});
    // } 

    //Watch lecture 240 to know better of how to deeply clone an aboject
    
    //inputIdentifiers are the keys of orderForm, check line 120
    inputChangeHandler = (event, inputIdentifier) => {
        //This does not create a deep clone because we got nested objects and they would not be cloned deeply
        //but there we just copy the pointer to them and hence when we change something, it will still mutate the original state
        //so we have to also copy the properties inside the selected orderForm element deeply
        //(elementType, elementConfig, value <---- we need this one)
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:  true
        });
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement
        })
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched ={formElement.config.touched}
                        message = {formElement.id}                        
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading) {
            form =<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))