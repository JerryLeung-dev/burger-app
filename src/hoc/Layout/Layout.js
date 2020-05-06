import React, {Component} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component{
    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer:!this.state.showSideDrawer};
        });
    }

    

    render() {
        return (
        <>
            <Toolbar 
                drawerToggleCLicked={this.sideDrawerToggleHandler}
                isAuth = {this.props.isAuthenticated}
                />
            <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}
                isAuth = {this.props.isAuthenticated}
                />
            <main className={classes.Content}>
                {this.props.children}
                {this.props.isAuthenticated}
            </main>
        </>
        );
    };
}

const matchStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken!== null
    }
}
export default connect(matchStateToProps)(Layout);