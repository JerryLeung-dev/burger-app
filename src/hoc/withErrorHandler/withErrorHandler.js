import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

//Design the error displaying modal as a higher order component
//so that it can be reused for any other errors
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }
        constructor(props) {


            super(props);
            //interceptors run or modify the request or response before it reaches their destinations
            //in this case, we try to catch the erro (if it has) and set it to the state
            this.reqInterceptor = axios.interceptors.request.use(req=> {
                this.setState({error: null});
                // return the request so the request can continue
                return req;
            })
            // return the response so the response can continue
            // res=>res return res, shorthand syntax

            this.resInterceptor = axios.interceptors.response.use(res=>res, error => {
                this.setState({error: error});
            });
        }
        //we have to clear the old interceptors once we unmount the component,
        //so that withErrorHandler won't keep all interceptors of every single call
        //being active, which leads to the memory leaks in best case
        // or changing error state in worst case.
        componentWillUnmount() {

            //show in browser console, Will Unmount 0 0 , the  0 0 is the ID, the reference
            // of request and response
            console.log('Will Unmount', this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <>
                {/* Modal component we created also exposed to clicked property, use this to clear the error when we click */}
                <Modal 
                    show ={this.state.error} // if the erro is null, it is false
                    modalClosed ={this.errorConfirmedHandler}>
                    {/* The modal is always present even if we dont show it,
                    so the this.state.error.message will throw error, to solve this,
                    we simply add ternary expression to show the error message only it has content
                    otherwise it is null */}
                    {this.state.error ? this.state.error.message : null}
                </Modal> 
                <WrappedComponent {...this.props} />
             </>
            );
        }
    } 
};

export default withErrorHandler
