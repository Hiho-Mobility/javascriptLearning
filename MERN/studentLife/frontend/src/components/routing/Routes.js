import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../layout/Dashboard';
import Hackathons from '../layout/Hackathons';
import SignedInNav from '../layout/SignedInNav';
import { Fragment } from 'react';
import { PrivateRoute } from './PrivateRoute';
import MainProfile from '../profile/MainProfile';
import PersonalInfo from '../signup/PersonalInfo';
import Experience from '../signup/Experience';
const Routes = () => {
  return (
    <Fragment>
      <SignedInNav />
      <section className='container'>
        <Switch>
          <PrivateRoute exact path='/home' component={Dashboard} />
          <PrivateRoute exact path='/hackathons' component={Hackathons} />
          <PrivateRoute exact path='/profile' component={MainProfile} />
          <PrivateRoute exact path='/registerPersonal' component={PersonalInfo} />
          <PrivateRoute exact path='/registerExperience' component={Experience} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;


//need to create a logout function that removes token from local storage