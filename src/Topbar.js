
import React from 'react';
import { Menu, Avatar, Drawer, } from 'antd';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { Navbar, Nav, NavLink, NavItem, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

// import './App.css';
const { SubMenu } = Menu;


export default class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
    this.registerModal = React.createRef();
    this.drawer = React.createRef();
  }

  state = {
    current: 'mail',
    redirectHome: false,
    redirectSaved: false,
    redirectUser: false,
    redirectBrowse: false,
    redirectLogin: false,
    redirectSignup: false,
    drawerVisible: false,
  };

  handleMobileClick = () => {
    this.setState({ drawerVisible: true });
  }

  onClose = () => {
    this.setState({ drawerVisible: false });

  }

  handleClick = e => {
    this.setState({ current: e.key });
    if (e.key === "login") {
      this.setState({ redirectLogin: true });
    } else if (e.key === "register") {
      this.setState({ redirectSignup: true });
    } else if (e.key === "logout") {
      localStorage.clear("currentUser");
      if (window.location.pathname == '/user') {
        this.setState({ redirectHome: true });
      } else {
        window.location.reload();
      };
    } else if (e.key === "home") {
      this.setState({ redirectHome: true });
    } else if (e.key === "user" || e.key === "userMenu") {
      this.setState({ redirectUser: true });
    } else if (e.key === "browse") {
      this.setState({ redirectBrowse: true });
    };
  };

  logout = () => {
    localStorage.clear("currentUser");
    this.setState({ redirectHome: true });
  }

  goToSaved = () => {
    this.setState({ redirectSaved: true });
  }

  goToBrowse = () => {
    this.setState({ redirectBrowse: true });
  }

  render() {
    console.log('rerendering');
    const { current } = this.state;
    const url = "/";
    if (this.state.redirectHome) {
      // can remove this to just not do anything if already at home. Currently reloads
      if (window.location.pathname == '/') {
        window.location.reload();
      };
      return <Redirect to='/' />
    } else if (this.state.redirectSaved) {
      return <Redirect to="/saved" />
    } else if (this.state.redirectBrowse) {
      return <Redirect to="/cardsearch" />
    }

    let username = localStorage.getItem('currentUser');

    // add in some form of redirect if user logged out?
    return (
      <Navbar class="nav-color" bg="dark" variant="dark">
        <Navbar.Brand >RightCard</Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link onClick={this.goToBrowse}>Browse Cards</Nav.Link>
          <Nav.Link onClick={this.goToSaved}>My Cards</Nav.Link> */}
          <NavItem>
            <Nav.Link as={Link} to="/cardsearch">Browse Cards</Nav.Link>
          </NavItem>

          <NavItem>
            <Nav.Link as={Link} to="/saved">My Cards</Nav.Link>
          </NavItem>
        </Nav>

        {localStorage.getItem("currentUser") !== null ?
          <><Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: {username}
            </Navbar.Text>

          </Navbar.Collapse>
            <Nav>
              <Nav.Link onClick={this.logout} href="/">
                Log out
        </Nav.Link>
            </Nav></>
          : (<></>)

        }




      </Navbar>

    );
  }
}
