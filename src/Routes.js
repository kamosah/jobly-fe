import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import CompaniesList from './company/CompaniesList';
import CompanyPage from './company/CompanyPage';
import RegisterForm from './user/RegisterForm';
import ProfilePage from './user/ProfilePage';
import LoginForm from './user/LoginForm';
import HomePage from './misc/HomePage';
import NotFound from './misc/NotFound';
import JobsList from './job/JobsList';
import EditProfileForm from './user/EditProfileForm';

/**
 * *** Routes.js ***
 * - component allowing react router functionality
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
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
          path="/edit/profile"
          render={(rtProps) => <EditProfileForm ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
        />
        <Route
          exact
          path="/profile"
          render={(rtProps) => <ProfilePage ensureLoggedIn={this.props.ensureLoggedIn} {...rtProps} />}
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
          render={() => <NotFound />}
        />
      </Switch>
    );
  }
}

Routes.propTypes = {
  ensureLoggedIn: PropTypes.func
}

export default Routes;
