import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import CompaniesList from './CompaniesList';
import CompanyPage from './CompanyPage';
import AddCompanyForm from './AddCompanyForm';
import EditCompanyForm from './EditCompanyForm';
import JobsList from './JobsList';
import JobPage from './JobPage';
import AddJobForm from './AddJobForm';
import EditJobForm from './EditJobForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfilePage from './ProfilePage';
import EditProfileForm from './EditProfileForm';
import NotFound from './NotFound';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/companies/edit/:handle" render={(rtProps) => <EditCompanyForm {...rtProps}/>}/>
            <Route exact path="/companies/:handle" render={(rtProps) => <CompanyPage {...rtProps}/>}/>
            <Route exact path="/companies/add" render={() => <AddCompanyForm />}/>
            <Route exact path="/companies" render={() => <CompaniesList />}/>
            <Route exact path="/jobs/edit/:id" render={(rtProps) => <EditJobForm {...rtProps}/>}/>
            <Route exact path="/jobs/:id" render={(rtProps) => <JobPage {...rtProps}/>}/>
            <Route exact path="/jobs/add" render={() => <AddJobForm/>}/>
            <Route exact path="/jobs" render={() => <JobsList/>}/>
            <Route exact path="/profile/edit" render={() => <EditProfileForm/>}/>
            <Route exact path="/profile" render={() => <ProfilePage/>}/>
            <Route exact path="/signup" render={() => <SignupForm/>}/>
            <Route exact path="/login" render={(rtProps) => <LoginForm {...rtProps}/>}/>
            <Route exact path="/" render={() => <HomePage />}/>
            <Route render={() => <NotFound />}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
