import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './misc/HomePage';
import CompaniesList from './company/CompaniesList';
import CompanyPage from './company/CompanyPage';
import AddCompanyForm from './company/AddCompanyForm';
import EditCompanyForm from './company/EditCompanyForm';
import JobsList from './job/JobsList';
import LoginForm from './user/LoginForm';
import RegisterForm from './user/RegisterForm';
import ProfilePage from './user/ProfilePage';
import EditProfileForm from './user/EditProfileForm';
import NotFound from './misc/NotFound';
import Logout from './misc/Logout';

export default class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => <HomePage ensureLoggedIn={this.props.ensureLoggedIn} />} />
          <Route className="container">
            <Route exact path="/companies/edit/:handle" render={(rtProps) => <EditCompanyForm ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />} />
            <Route exact path="/companies/:handle" render={(rtProps) => <CompanyPage ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />} />
            <Route exact path="/companies/add" render={() => <AddCompanyForm />} ensureLoggedIn={this.props.ensureLoggedIn} />
            <Route exact path="/companies" render={(rtProps) => <CompaniesList ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />} />
            <Route exact path="/jobs" render={() => <JobsList ensureLoggedIn={this.props.ensureLoggedIn} />} />
            <Route exact path="/profile/edit" render={() => <EditProfileForm ensureLoggedIn={this.props.ensureLoggedIn} />} />
            <Route exact path="/profile" render={() => <ProfilePage ensureLoggedIn={this.props.ensureLoggedIn} />} />
            <Route exact path="/register" render={(rtProps) => <RegisterForm {...rtProps} ensureLoggedIn={this.props.ensureLoggedIn} />} />
            <Route exact path="/login" render={(rtProps) => <LoginForm {...rtProps} ensureLoggedIn={this.props.ensureLoggedIn} />} />
            <Route exact path="/logout" render={(rtProps) => <Logout {...rtProps}/>} />
          </Route>
          <Route exact render={() => <NotFound ensureLoggedIn={this.props.ensureLoggedIn} />} />
        </Switch>
    );
  }
}
