import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '@material-ui/core/Button';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  backLogoutButton:{
    background: '#dc3545',
    color: '#ffffff',
  },
  backLoginButton:{
    background: '#007bff',
    color: '#ffffff',
  }
}));

function Header() {
  const Check = () => {
    let id = localStorage.getItem('id');
    if (id === null) {
      return(
        <>
          <Nav className="mr-auto">
            <Nav.Link variant="button" color="textPrimary" href="/home" className={classes.link}>Home</Nav.Link>
          </Nav>
          <Button href="/Login" color="primary" variant="outlined" className={classes.link, classes.backLoginButton}>Login</Button>
        </>
      )
    } else {
      return (
        <>
          <Nav className="mr-auto">
            <Nav.Link variant="button" color="textPrimary" href="/home" className={classes.link}>Home</Nav.Link>
            <Nav.Link variant="button" color="textPrimary" href="/Led" className={classes.link}>Led</Nav.Link>
            <Nav.Link variant="button" color="textPrimary" href="/Setting" className={classes.link}>Setting</Nav.Link>
            <Nav.Link variant="button" color="textPrimary" href="/Service" className={classes.link}>Service</Nav.Link>
            <Nav.Link variant="button" color="textPrimary" href="/Feedback" className={classes.link}>Feedback</Nav.Link>
          </Nav>
          <Button href="/Logout" color="primary" variant="outlined" className={classes.link, classes.backLogoutButton}>Logout</Button>
        </>
      )
    }
  }
  const classes = useStyles();
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" variant="light">
        <Navbar.Brand href="/">Webser client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Check/>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;
