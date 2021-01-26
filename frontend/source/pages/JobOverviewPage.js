import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import HomeIcon from '@material-ui/icons/Home';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import { Link} from 'react-router-dom';
import {searchByJob} from '../API/JobSearchAPI'
import {useState,useEffect} from 'react'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href="https://material-ui.com/"> */}
        Skill-Link
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6),
  },
}));

const cards = [0, 1, 2];

const photos = ["http://localhost:3000/images/medianSalary.jpg", "http://localhost:3000/images/dailyActivities.jpg", "http://localhost:3000/images/relatedOccupation.jpg","http://localhost:3000/images/knowledge.jpg", "http://localhost:3000/images/abilites.jpg", "http://localhost:3000/images/skills.jpg"]


export default function JobOverviewPage (props) {
  let jobTitle = props.location.state.jobTitle
  let zipcode = props.location.state.zipcode
  let searchObject = {
    "job_title":jobTitle,
    "zipcode":zipcode
  }

  const [jobData,setJobData] = useState(Object())
  useEffect(() => {
    searchByJob(searchObject).then(response=>{
      setJobData(response)
    })
  }, [props])

  const classes = useStyles();
  console.log('joboverview in joboverview page',jobData)
  const jobObjectToRender = {
    'Median Annual Salary': [`$${jobData.job_median_annual_salary}`],
    'Daily Activities': jobData.daily_activities,
    'Related Occupations': jobData.related_occupations,
    'Knowledge': jobData.knowledge_list,
    'Abilities': jobData.abilities_list,
    'Skills': jobData.skills_list
  }

  const checkingProperties = (key, array) => {
    if (Object.keys(jobData).length !== 0){
      if (key == 'Related Occupations') {
        return array.map((item) => <li>             
          <Link to={{
          pathname:`/joboverview`,
          state:{
            jobTitle: item,
            zipcode: zipcode
          }
          }}>{item}</Link></li>)
      }
      else{
        return array.map((item) => <li>{item}</li>)
      }
    }
  }

  console.log('jobObjectToRender',jobObjectToRender)
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <Link color="inherit" underline='hover' href="/"> */}
          <Link to={`/`}>
            <Typography variant="h6" color="inherit" noWrap>
              <Button variant="contained" color="primary" size="large">
                Skill - Link
              </Button>
            </Typography>
          </Link>
          {/* </Link> */}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container>
            <div className="d-flex justify-content-start">
              <div className="order-2 p-2 bd-highlight">
                <Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                {jobTitle}
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                  {jobData.job_description}
                </Typography>
              </div>
              <div className="order-1 p-2 bd-highlight" dangerouslySetInnerHTML={{__html:jobData.job_video}} />
            </div>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to={{
                    pathname:`/joblisting`,
                    state:{
                      jobTitle:jobTitle,
                      zipcode:zipcode
                    }
                    }}>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={{
                    pathname:`/learningResources`,
                    state:{
                      jobTitle:jobTitle,
                      zipcode:zipcode
                    }
                    }}>
                    <Button variant="outlined" color="primary">
                      Educational Resources
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Object.keys(jobObjectToRender).map((key,card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={photos[card]}
                    title="Image title"
                  />
                  {console.log(card)}
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {key}
                    </Typography>
                    <Typography>
                      <div>
                        <ul>
                          {checkingProperties(key, jobObjectToRender[key])}
                        </ul>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

