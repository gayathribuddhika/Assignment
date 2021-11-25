// import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
// import AddUser from './components/users';
import AddUser from './components/sample';

const App = () => {
  return (
    <Router>
      <div>
      <Header />
      <Route path="/register" exact component={AddUser}></Route>
      {/* <NewUser /> */}
      </div>
    </Router>
  );
};

export default App;
