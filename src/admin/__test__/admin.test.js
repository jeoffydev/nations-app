 
  
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import TestRenderer from 'react-test-renderer';
  
import Users from '../users';
import Songs from '../songs';
import Form from '../../form/input';
import AddInstrument from '../add-instrument';

//npm install @testing-library/react --save
import { render, cleanup } from '@testing-library/react';

import {PopupHeader, EditButton, AddButton} from '../popup/popup-helper';  

//Use @testing-library/jest-dom then import @testing-library/jest-dom/extend-expect
import "@testing-library/jest-dom/extend-expect";

import renderer   from 'react-test-renderer'; 

afterEach(cleanup);

beforeEach(() => {
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
})

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<EditButton  label="Edit" />, div )
})


 
 

 
it("matches snapshots", ()=>{
    const tree = renderer.create( <EditButton    /> ) .toJSON()  ;
    expect(tree).toMatchSnapshot();
})


 

  const testRenderer = TestRenderer.create(<PopupHeader idname="song" label="Test label"  />);
  const testInstance = testRenderer.root;
  
  expect(testInstance.findByType(PopupHeader).props.idname).toBe('song');  