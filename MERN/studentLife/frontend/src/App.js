import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/welcomePage/HomePage';
import Login from './components/welcomePage/Login';
import Routes from './components/routing/Routes';
import './App.css';
import { NonPrivRoute } from './components/routing/NonPrivRoute';

function App() {
  useEffect(() => {
    // var hello = fetch("/hi")
    //   .then(function (res) {
    //     // return res.json()
    //     console.log(res)
    //   })
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })

    if (localStorage.getItem("token") === undefined) {
      localStorage.removeItem("token");
    }

  })


  return (
    <Router>
      <Fragment>
        <Switch>
          <NonPrivRoute exact path='/' component={HomePage} />
          <NonPrivRoute exact path='/login' component={Login} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
