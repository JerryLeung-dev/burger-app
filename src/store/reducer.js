import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

//We don't need break statement because we will return the case anyway,
//so the code executions won't continue in this function.
const reducer = ( state = initialState, action) => {
    switch (action.type){
        //be aware of the nesting object when copying
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    //Watch tutorial folder set dynamic property keys
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                }
                
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    //Watch tutorial folder set dynamic property keys
                    [action.ingredientName]:state.ingredients[action.ingredientName] -1
                }
            };
        default:
            return state;

    }
};

export default reducer