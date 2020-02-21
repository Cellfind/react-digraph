import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Bwdl from './bwdl';
import BwdlEditable from './bwdl-editable';
import Graph from './graph';
import GraphFast from './fast';

import './app.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header className="app-header">
            <nav>
              <NavLink to="/" exact={true} activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/bwdl" activeClassName="active">
                BWDL
              </NavLink>
            </nav>
          </header>

          <Route exact={true} path="/" component={Graph} />
          <Switch>
            <Route path="/bwdl" component={Bwdl} />
            {/* The following is for typos */}
            <Redirect from="/bwld" to="/bwdl" />
            <Route path="/bwdl-editable" component={BwdlEditable} />
            <Route path="/fast" component={GraphFast} />
          </Switch>
        </div>
      </Router>
    );
  }
}

if (typeof window !== 'undefined') {
  window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('content'));
  };
}
