import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Homepage from './Homepage';
import CompaniesList from './CompaniesPage';
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
import ErrorPage from './ErrorPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Homepage />}/>
          <Route exact path="/companies" render={() => <CompaniesList />}/>
          <Route exact path="/companies/:handle" render={(rtProps) => <CompanyPage {...rtProps}/>}/>
          <Route exact path="/companies/add" render={() => <AddCompanyForm />}/>
          <Route exact path="/companies/:handle/edit" render={(rtProps) => <EditCompanyForm {...rtProps}/>}/>
          <Route exact path="/jobs" render={() => <JobsList/>}/>
          <Route exact path="/jobs/add" render={() => <AddJobForm/>}/>
          <Route exact path="/jobs/:id" render={(rtProps) => <JobPage {...rtProps}/>}/>
          <Route exact path="/jobs/:id/edit" render={(rtProps) => <EditJobForm {...rtProps}/>}/>
          <Route exact path="/login" render={() => <LoginForm/>}/>
          <Route exact path="/signup" render={() => <SignupForm/>}/>
          <Route exact path="/profile" render={() => <ProfilePage/>}/>
          <Route exact path="/profile/edit" render={() => <EditProfileForm/>}/>
          <Route path="/" render={() => <ErrorPage />}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
