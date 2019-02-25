import React from 'react'


class Nav extends React.Component{
constructor(){
    super();
    this.state = {
    }

    this.toggleCollapse = this.toggleCollapse.bind(this)

}

  toggleCollapse(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return(
        <Navbar fixed="top" light expand="md">
              <NavbarBrand>
                <a href='/'><strong className="white-text">Save More</strong></a>
              </NavbarBrand>
              <NavbarToggler
                onClick={this.toggleCollapse}
              />

              <Collapse
                id="navbarCollapse3"
                isOpen={this.state.isOpen}
                navbar
              >
                <NavbarNav right>
                  <NavItem>
                    <a href="/users/sign_in">Login</a>
                  </NavItem>
                  <NavItem>
                    <a href="/users/sign_up">Register</a>
                  </NavItem>
                </NavbarNav>

              </Collapse>
          </Navbar>
    );
  }
}

export default Nav;