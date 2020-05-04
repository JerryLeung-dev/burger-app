import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients : null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
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
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
                
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    //Watch tutorial folder set dynamic property keys
                    [action.ingredientName]:state.ingredients[action.ingredientName] -1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default:
            return state;

    }
};

export default reducer