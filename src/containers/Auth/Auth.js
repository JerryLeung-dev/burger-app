import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';


class Auth extends Component {
    state = {
        controls :{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: false
    }

    inputChangeHandler = (event, controlName) => {
        //This does not create a deep clone because we got nested objects and they would not be cloned deeply
        //but there we just copy the pointer to them and hence when we change something, it will still mutate the original state
        const updateControlsForm ={
            ...this.state.controls
        };
        //so we have to also copy the properties inside the selected orderForm element deeply
        //(elementType, elementConfig, value <---- we need this one)
        const updatedFormElement = {
            ...updateControlsForm[controlName]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        // console.log(updatedFormElement.valid);
        updateControlsForm[controlName] = updatedFormElement;
        

        let formIsValid = true;
        for (let controlName in updateControlsForm){
            formIsValid = updateControlsForm[controlName].valid && formIsValid;
        }
        // console.log(this.state.orderForm);
        this.setState({controls: updateControlsForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {    
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.isPassword){
            const pattern = /(?=.{8,})/;
            isValid = pattern.test(value);
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    
    signUpHandler = () => {
        this.setState({isSignUp: true});
    }

    signInHandler = () => {
        this.setState({isSignUp: false});
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        // console.log(formElementsArray);
        const errorMessage = (
            <p style={{'color':'red'}}>{this.props.error}</p>
        )
        let form = <Spinner />
        if(!this.props.loading){
            form = (
                <form onSubmit={this.submitHandler}>
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
                    <Button btnType="Success" 
                            disabled={!this.state.formIsValid} 
                            clicked={this.signUpHandler}>Sign Up</Button>
                    <Button btnType="Danger" 
                            disabled={!this.state.formIsValid}
                            clicked={this.signInHandler}>Sign In</Button>
                </form>
            );
        }
             
        
        return (
            <div className={classes.Auth}>
                <h1>Login Form</h1>
                {form}
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);