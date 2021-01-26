import HomePage from './pages/HomePage.js';
import JobPage from './pages/JobPage.js';
import SkillPage from './pages/SkillPage.js';
import ZipcodePage from './pages/ZipcodePage.js';
import JobSearchResultPage from './pages/JobSearchResultPage.js';
import JobListingPage from './pages/JobListingPage.js';
import JobListingsPage from './pages/JobListingsPage.js';
import JobOverviewPage from './pages/JobOverviewPage.js';
import JobTitleListingsPage from './pages/JobTitleListingsPage';
import JobSkillSurvey from './pages/JobSkillSurveyPage'
import LearningResources from './pages/LearningResources'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

function App() {
  return ( 
    <div className = 'app'>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/jobs" component={JobPage} />
        <Route exact path="/skills" component={SkillPage} />
        <Route exact path="/zipcode" component={ZipcodePage} />
        <Route exact path="/JobSearchResultPage" component={JobSearchResultPage} />
        <Route exact path="/joblisting" component={JobListingPage} />
        <Route exact path="/listings" component={JobListingsPage} />
        <Route exact path="/joboverview" component={JobOverviewPage} />
        <Route exact path="/jobtitlelistings" component={JobTitleListingsPage} />
        <Route exact path="/survey" component={JobSkillSurvey} />
        <Route exact path="/learningResources" component={LearningResources} />
      </Router>
    </div>
  );
}

export default App;
