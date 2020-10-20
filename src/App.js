import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Room from './components/Room/Room';

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/chat' component={Room} />
  </Router>
);

export default App;
