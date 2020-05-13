import React, {Component, Suspense} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';

const Auth = React.lazy(()=>import('./containers/Auth/Auth'));
const Orders = React.lazy(() =>import('./containers/Orders/Orders'));
const Checkout = React.lazy(()=> import('./containers/Checkout/Checkout'));
const Logout = React.lazy(()=>import('./containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routers = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/auth" component= {Auth} />
          <Route path="/" exact component ={BurgerBuilder} />
          {/* If user directs to any unknown path, redirect back to homepage */}
          <Redirect to= "/" />
        </Switch>
      </Suspense>
      
    )
    if(this.props.isAuthenticated){
      routers = (
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component= {Auth} />
            <Route path="/logout" component= {Logout} />
            <Route path="/" exact component= {BurgerBuilder} />
            <Redirect to= "/" />
          </Switch>
        </Suspense>       
      ); 
    }
    return (
      <div>
        <Layout>
          {routers}
        </Layout>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
