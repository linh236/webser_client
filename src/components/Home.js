import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from './Slider';
import {URL} from './Myconnect';
import Parser from 'html-react-parser';

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
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

const effectives = [
  {
    title: 'Reputations',
    price: '100%',
    description: [
      'Good security',
      'Cheap room',
      'The manager is enthusiastic',
      'Excellent management system'
    ],
    buttonText: 'Thanks for your trust',
    buttonVariant: 'outlined',
    url: '',
    stars: ["1",'1','1']
  },
  {
    title: 'Saving and profitable',
    price: '15 - 20%',
    description: [
      'A lot of money',
      'A lot of time',
      'Turn on and off smart devices',
      'Control without distance limitation',
    ],
    buttonText: 'Remote device control',
    buttonVariant: 'contained',
    url: '/Led',
    stars: ["1",'1','1','1']
  },
  {
    title: 'Qualities',
    price: '100%',
    description: [
      'Nice clean space',
      'Spacious and airy room',
      'Good facility',
      'Phone & email support',
    ],
    buttonText: 'It is important',
    buttonVariant: 'outlined',
    url: '',
    stars: ["1",'1','1']
  },
];


function Home() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regulations, setRegulations] = useState([]);
  const [housename, setHouseName] = useState('');
  let id = localStorage.getItem('id');

  const classes = useStyles();
  const IsLogin = () => {
    return(
      <>
      <React.Fragment>
        <CssBaseline />
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Quickly build an effective pricing table for your potential customers with this layout.
            It&apos;s built with default Material-UI components with little customization.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {effectives.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={
                      tier.stars.map((star,value) => (
                        <span key={value}>
                          <StarIcon/>
                        </span>
                      ))
                    }
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>


                    </div>

                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
      </>
    )
  }

  const star = (start) => {
    for (var i = 0; i < start; i++) {
      return(
        <>
        <StarIcon/>
        </>
      )
    }
  }
  const Login = () => {
  return(
    <>
      <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {effectives.map((effect) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={effect.title} xs={12} sm={effect.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card>
              <CardHeader
                title={effect.title}
                subheader={
                  effect.stars.map((star,value) => (
                    <span key={value}>
                      <StarIcon/>
                    </span>
                  ))
                }
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {effect.price}
                  </Typography>
                </div>
                <ul>
                  {effect.description.map((line) => (
                    <Typography component="li" variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth href={effect.url} variant={effect.buttonVariant} color="primary">
                  {effect.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      <div className="regulation">
        <Container maxWidth="md" component="main">
          {
            isLoading === true ?
                <div>Loading</div>
            :
            <>
                  <div>{regulations.map((key,value)=> (
                    <Card key={value}>
                      <CardHeader
                        title={key.title}
                        subheader={housename}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader}
                      />
                      <CardContent>
                        <div className={classes.cardPricing}>
                          <Typography component="h5" variant="h5" color="textPrimary">
                            {Parser(key.description)}
                          </Typography>
                        </div>

                      </CardContent>
                    </Card>
                ))}</div>
            </>
          }
        </Container>
      </div>
    </>
  )
}

  const regulation = (id) => {
    let url = URL+`/api/getRegulations/${id}`;
    fetch(url)
       .then(res => res.json())
       .then(res => {
         setRegulations(res.regulations);
         setHouseName(res.house_name);
       })
       .catch((error) => {
         setError(error);
       })
       .finally(() => setLoading(false));

  }
  useEffect(()=> {
    let id = localStorage.getItem('id');
    if (id !== null) {
      regulation(id);
    }
  },[])
  return (
    <>
    <div>
      <Slider/>
    </div>
      {
        id === null ?
          <IsLogin />
        :
          <Login/>
      }
    </>
  );
}
export default Home;
// <Typography variant="h6" color="textSecondary">
//   /mo
// </Typography>
