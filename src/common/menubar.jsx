import React   from 'react'; 
import { Menu, Button } from 'semantic-ui-react';
import NationsLogo from './logo';

export  function MenuBar(){

    return (

        <Menu inverted fixed ='top'>
            <Menu.Item header>
                <NationsLogo classes="img-thumbnail small-logo" imgUrl="/nations-logo.png" /> 
            </Menu.Item> 
            <Menu.Item name="Post" />
            <Menu.Item>
                <Button positive content="Create new post" />    
            </Menu.Item>
        </Menu>

    )
}

export default MenuBar;