import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';


class Auth extends Component {
    state = {
        controls :{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: 'luongvidu@gmail.com',
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
                value: 'luongvidu96',
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
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });       

        let formIsValid = true;
        for (let controlName in updatedControls){
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }
        // console.log(this.state.orderForm);
        this.setState({controls: updatedControls, formIsValid: formIsValid});
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

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/' ){
            //that means we are trying to redirect to checkout even though we
            // are not building a
            this.props.onSetRedirectPath();
        }
    }
    render() {
        let authRedirect = null
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
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
                            // disabled={!this.state.formIsValid} 
                            clicked={this.signUpHandler}>Sign Up</Button>
                    <Button btnType="Danger" 
                            // disabled={!this.state.formIsValid}
                            clicked={this.signInHandler}>Sign In</Button>
                </form>
            );
        }
             
        
        return (
            
            <div className={classes.Auth}>
                {authRedirect}
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
        error: state.auth.error,
        isAuthenticated: state.auth.idToken!== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);