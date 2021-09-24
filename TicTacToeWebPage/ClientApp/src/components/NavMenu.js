import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

function NavMenu() {
    const [stateCollapsed, setState] = useState(true);
    
    const toggleNavbar = () => {
        setState(!stateCollapsed);
    }
    
    const LogoutFunction = () => {
        (async () => {
            await fetch("https://localhost:5001/api/Logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include'
            });
        })();
    }
   
    return (
      <header className={"backgroundcolor"}>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} className="text-white" to="/">TDtry</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!stateCollapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/TicTacToeMain">Tic Tac Toe</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-white" onClick={LogoutFunction} to="/Login">Log Out</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default NavMenu;