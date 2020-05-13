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
    //it is an individual case
    //intake 1st arg as description and 2nd arg as anonymous func
    it('should render two <NavigationItem> elements if not authenticated', ()=>{
        //render and assign the test component to a variable
        const wrapper = shallow(<NavigationItems />);
        //the desired output
        //find the child comp in the test component
        //the child comps found should be 2 items
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});