// import './App.css';
import {BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import NewUser from './user/pages/users';

const App = () => {
  return (
    <Router>
      <Header />
      {/* <Route path="/" exact compinent={NewUser}></Route> */}
      <NewUser />
    </Router>
  );
};

export default App;
