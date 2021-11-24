// import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import NewUser from './components/users';

const App = () => {
  return (
    <Router>
      <div>
      <Header />
      <Route path="/register" exact component={NewUser}></Route>
      {/* <NewUser /> */}
      </div>
    </Router>
  );
};

export default App;
