import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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
 * 
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/companies/:handle"
          render={(rtProps) => <CompanyPage {...rtProps} />}
        />
        <Route
          exact
          path="/companies"
          render={(rtProps) => <CompaniesList {...rtProps} />}
        />
        <Route
          exact
          path="/register"
          render={(rtProps) => <RegisterForm {...rtProps} />}
        />
        <Route
          exact
          path="/edit/profile"
          render={(rtProps) => <EditProfileForm {...rtProps} />}
        />
        <Route
          exact
          path="/profile"
          render={(rtProps) => <ProfilePage {...rtProps} />}
        />
        <Route
          exact
          path="/login"
          render={(rtProps) => <LoginForm {...rtProps} />}
        />
        <Route
          exact
          path="/jobs"
          render={(rtProps) => <JobsList {...rtProps} />}
        />
        <Route
          exact
          path="/"
          render={() => <HomePage />}
        />
        <Route
          exact
          render={() => <NotFound />}
        />
      </Switch>
    );
  }
}


export default Routes;
