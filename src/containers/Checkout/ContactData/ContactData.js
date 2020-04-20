import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    errorMessage = [
        "This is required field",
        "Minimum length 5",
        "Maximum length 5"
    ];
    state ={
        orderForm : {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid : false,
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
                        placeholder: 'ZIP CODE'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
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
                        placeholder: 'Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value:"cheapest", displayValue:'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                },
            },
            formIsValid: false,
            loading: false,
            errorMessage:[]
        }  

        
     orderHandler = (event) => {
        event.preventDefault();
         // Firebase uses same structure as MongoDB, we don't actually have
        // tables, but we just have json nested structure and if you send 
        //a request to the firebase URL like '/order', its gonna create a node and store the data beneath that node
     
        //the order is about to get sent, so set loading to true
        this.setState({loading: true});
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
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
        }
        // console.log(order);
        axios.post('/orders.json', order)
        //     //Either the response or error is back, we would want to stop display the loading spinner
        //     //lecture 182 from 7:08 onwards explain why the spinner doesn't appear
            .then(response => {
            //    console.log(response);
               this.setState({loading: false});
               this.props.history.push('/')
            })
            .catch(error => this.setState({loading: false}));
        
     }
    
    assignErrorMessage(validBoolean, messageList, message){
        if(validBoolean === false) {
            if(messageList.indexOf(message) == -1){
                messageList.push(message); 
            }
        }
        if(validBoolean === true) {
            if(messageList.indexOf(message) !== -1){
                messageList.splice(messageList.indexOf(message), 1);
            }
        }
        this.setState({errorMessage: messageList});
    } 

    checkValidity(value, rules) {
        let isValid = true;
    // So now isValid is updated to True or false 
    //depending on the check if the trimmed value is unequal
    // to an empty string


    //we can add something to each check
    // here. We can say isValid should it be true if a check is true
    // and if isValid already was true
    // so we change && isValid. If we do
    // this in every rule, then just one rule resolving to true alone won't do the trick,
    // all the rules now have to resolve to true.

        let errorMessage = [...this.state.errorMessage];
        if(rules.required) {
            //Directly set the condition to the boolean value---> new THING
            isValid = value.trim() !== '' && isValid;
            this.assignErrorMessage(isValid, errorMessage, "This is a required field");
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            this.assignErrorMessage(isValid, errorMessage, "Minimum 5 character");
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            this.assignErrorMessage(isValid, errorMessage, "Maximum 5 character");   
        }
        return isValid;
    }
    //Watch lecture 240 to know better of how to deeply clone an aboject
    
    //inputIdentifiers are the keys of orderForm, check line 120
    inputChangeHandler = (event, inputIdentifier) => {
        //This does not create a deep clone because we got nested objects and they would not be cloned deeply
        //but there we just copy the pointer to them and hence when we change something, it will still mutate the original state
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        //so we have to also copy the properties inside the selected orderForm element deeply
        //(elementType, elementConfig, value <---- we need this one)
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        // console.log(updatedFormElement.valid);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(this.state.orderForm);
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
        // console.log(formElementsArray);
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
                        message = {this.state.errorMessage}                        
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading) {
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

export default ContactData