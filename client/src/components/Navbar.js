import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { isAuthenticated, logout } from '../fakeAuth';

const styles = {
  activeNav: {
    textDecoration: 'underline',
    backgroundColor: 'black',
    color: 'white',
  },
}

const authLinks = () => {
  if(isAuthenticated()) 
  return(
    [ 
    <Menu.Item>
    <NavLink exact to='/dashboard' activeStyle={styles.activeNav}> Dashboard </NavLink>
    </Menu.Item>,
    <Menu.Item>
    <a href='#' onClick={ logout }> Logout </a>
    </Menu.Item>
    ]
  )
  else 
    return(
      <Menu.Item>
        <NavLink exact to='/login' activeStyle={styles.activeNav}> Login </NavLink>
      </Menu.Item>
    )
}

const Navbar = ()=> (
  <Menu>
    <Menu.Item name='Home'>
    <NavLink exact activeStyle={styles.activeNav} to='/'> Home </NavLink>
    </Menu.Item>
    <Menu.Item name='About'>
    <NavLink activeStyle={styles.activeNav} to='/about'> About </NavLink>
    </Menu.Item>
    {authLinks()}
  </Menu> 
)

export default Navbar;