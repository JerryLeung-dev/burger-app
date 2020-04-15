import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state ={
        orderForm : {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value:"cheapest", displayValue:'cheapest'}
                        ]
                    },
                    value: ''
                },
            },
            loading: false
        }  

     orderHandler = (event) => {
        event.preventDefault();
         // Firebase uses same structure as MongoDB, we don't actually have
        // tables, but we just have json nested structure and if you send 
        //a request to the firebase URL like '/order', its gonna create a node and store the data beneath that node
     
        //the order is about to get sent, so set loading to true
        this.setState({loading: true});
        const order = {
            //in real app we have to recalculate the price in the server
            ingredients: this.props.ingredients,
            price: this.props.price,
            
        }

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

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        console.log(formElementsArray);
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                ))}
                <Button btnType="Success" onClick={this.orderHandler}>ORDER</Button>
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