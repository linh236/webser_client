import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
}));

function Header() {
  const Check = () => {
    let id = localStorage.getItem('id');
    if (id === null) {
      return(
        <>
          <Button href="/Login" color="primary" variant="outlined" className={classes.link}>
          Login
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Link variant="button" color="textPrimary" href="/Home" to="/Home" className={classes.link}>
          Home
          </Link>
          <Link variant="button" color="textPrimary" href="/Led" className={classes.link}>
          Led
          </Link>
          <Link variant="button" color="textPrimary" href="/Setting" className={classes.link}>
          Setting
          </Link>
          <Link variant="button" color="textPrimary" href="/Service" className={classes.link}>
          Service
          </Link>
          <Link variant="button" color="textPrimary" href="/Feedback" className={classes.link}>
          Feedback
          </Link>
          <Button href="/Logout" color="primary" variant="outlined" className={classes.link}>
          Logout
          </Button>
        </>
      )
    }
  }
  const classes = useStyles();
  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        WebSer
        </Typography>
        <nav>
        <Check/>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
