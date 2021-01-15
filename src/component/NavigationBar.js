import React, { Component  } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText
} from 'reactstrap';

class NavigationBar extends Component{
    state = {}
    render () {
        return ( <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Inventory</NavbarBrand>
            <NavbarToggler  />
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
              </Nav>
              <NavbarText>inventory</NavbarText>
            </Collapse>
          </Navbar>
        </div>
        )
    }
}

export default NavigationBar;
