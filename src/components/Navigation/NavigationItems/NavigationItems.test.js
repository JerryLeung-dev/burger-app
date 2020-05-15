import React from 'react';

//need configure of enzyme and adapter to connect to test case
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//new instance of adapter: an object 
configure({adapter: new Adapter()});

//intake a description and a anonymous function that returns cases.
describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    //it is an individual case
    //intake 1st arg as description and 2nd arg as anonymous func
    it('should render two <NavigationItem> elements if not authenticated', ()=>{
        //render and assign the test component to a variable
        //the desired output
        //find the child comp in the test component
        //the child comps found should be 2 items
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItem> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should contain logout link', ()=> {
        wrapper.setProps({isAuth: true});
        //contains is an enzyme API shallow rendering, receive node or nodes and return true/false;
        //in here we intake a node. 
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
});