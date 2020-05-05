import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationMessage = null;
    const inputClasses = [classes.InputElement];
    // console.log(validationMessage);

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        // validationMessage = <p>{props.message.join(' ')}</p>
        validationMessage = <p className={classes.ValidationMessage}>Please enter a valid {props.message}</p>
    }

    switch (props.elementType) {
        case('input'):
            inputElement = 
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                     onChange={props.changed}               
                    />; 
            break;
        case ('textarea'):
            inputElement = 
                <textarea 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                    />;
            break;
        case ('select'):
            inputElement =  <select
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                                >
                                {props.elementConfig.options.map(option =>(
                                    <option 
                                        key={option.value}
                                        value={option.value}>
                                        {option.displayValue}
                                    </option>
                                ))}
                            </select>;
            break;
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value}
                                onChange={props.changed}
                                />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    )
};

export default input