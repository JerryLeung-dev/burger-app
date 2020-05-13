import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = ( orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => dispatch(purchaseBurgerFail(error)));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//Orders 
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START //set state loading: true
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS, //set state loading : false
        orders : orders
    }
}

export const fetchOrderFail = () => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL //set state loading : false
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart()); //start fetching
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParam)
                .then(response => {
                    let fetchedOrders =  [];
                    for (let key in response.data) {
                       fetchedOrders.push({
                            ...response.data[key],
                            id: key
                       });

                    }
                    dispatch(fetchOrderSuccess(fetchedOrders)); // finish fetching
                })
                .catch(err => {
                    dispatch(fetchOrderFail()); //finish fetching
                });
    }
}
