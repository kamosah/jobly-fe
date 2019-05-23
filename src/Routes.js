import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './misc/HomePage';
import CompaniesList from './company/CompaniesList';
import CompanyPage from './company/CompanyPage';
import AddCompanyForm from './company/AddCompanyForm';
import EditCompanyForm from './company/EditCompanyForm';
import JobsList from './job/JobsList';
import JobPage from './job/JobPage';
import AddJobForm from './job/AddJobForm';
import EditJobForm from './job/EditJobForm';
import LoginForm from './user/LoginForm';
import RegisterForm from './user/RegisterForm';
import ProfilePage from './user/ProfilePage';
import EditProfileForm from './user/EditProfileForm';
import NotFound from './misc/NotFound';

export default class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route className="container">
            <Route exact path="/companies/edit/:handle" render={(rtProps) => <EditCompanyForm {...rtProps} />} />
            <Route exact path="/companies/:handle" render={(rtProps) => <CompanyPage {...rtProps} />} />
            <Route exact path="/companies/add" render={() => <AddCompanyForm />} />
            <Route exact path="/companies" render={() => <CompaniesList />} />
            <Route exact path="/jobs/edit/:id" render={(rtProps) => <EditJobForm {...rtProps} />} />
            <Route exact path="/jobs/:id" render={(rtProps) => <JobPage {...rtProps} />} />
            <Route exact path="/jobs/add" render={() => <AddJobForm />} />
            <Route exact path="/jobs" render={() => <JobsList />} />
            <Route exact path="/profile/edit" render={() => <EditProfileForm />} />
            <Route exact path="/profile" render={() => <ProfilePage />} />
            <Route exact path="/register" render={() => <RegisterForm />} />
            <Route exact path="/login" render={(rtProps) => <LoginForm {...rtProps} />} />
          </Route>
          <Route exact render={() => <NotFound />} />
        </Switch>
    );
  }
}
