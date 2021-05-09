 
  
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 

import {EditButton} from '../popup/popup-helper';  
import Users from '../users';

//npm install @testing-library/react --save
import { render, cleanup } from '@testing-library/react';

//Use @testing-library/jest-dom then import @testing-library/jest-dom/extend-expect
import "@testing-library/jest-dom/extend-expect";

import renderer   from 'react-test-renderer'; 

afterEach(cleanup);

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<EditButton  label="Edit" />, div )
})


it("renders without crashing", ()=>{
    const {getByTestId} = render( <EditButton   idname="user" id="0001111-xx1111" label="Edit"  /> )  
    expect(getByTestId('editbutton')).toBeTruthy();
})

 
it("renders without crashing", ()=>{
    const {getByTestId} = render( <EditButton   idname="user" id="0001111-xx1111" label="Edits"  /> )  
    expect(getByTestId('editbutton')).toBeTruthy();
})


 
it("matches snapshots", ()=>{
    const tree = renderer.create( <Users /> ) .toJSON()  ;
    expect(tree).toMatchSnapshot();
})