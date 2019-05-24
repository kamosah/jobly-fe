import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import EditCompanyForm from './company/EditCompanyForm';
import CompaniesList from './company/CompaniesList';
import CompanyPage from './company/CompanyPage';
import RegisterForm from './user/RegisterForm';
import ProfilePage from './user/ProfilePage';
import LoginForm from './user/LoginForm';
import HomePage from './misc/HomePage';
import NotFound from './misc/NotFound';
import JobsList from './job/JobsList';
import Logout from './user/Logout';

/**
 * 
 */
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/companies/edit/:handle"
          render={(rtProps) => <EditCompanyForm ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/companies/:handle"
          render={(rtProps) => <CompanyPage ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/companies"
          render={(rtProps) => <CompaniesList ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/register"
          render={(rtProps) => <RegisterForm {...rtProps} ensureLoggedIn={this.props.ensureLoggedIn} />}
        />
        <Route
          exact
          path="/profile"
          render={(rtProps) => <ProfilePage ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/logout"
          render={(rtProps) => <Logout {...rtProps} />}
        />
        <Route
          exact
          path="/login"
          render={(rtProps) => <LoginForm {...rtProps} ensureLoggedIn={this.props.ensureLoggedIn} />}
        />
        <Route
          exact
          path="/jobs"
          render={(rtProps) => <JobsList ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/"
          render={() => <HomePage ensureLoggedIn={this.props.ensureLoggedIn} />}
        />
        <Route
          exact
          render={() => <NotFound ensureLoggedIn={this.props.ensureLoggedIn} />}
        />
      </Switch>
    );
  }
}

Routes.propTypes = {
  ensureLoggedIn: PropTypes.func
}
