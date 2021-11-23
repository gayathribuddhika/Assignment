import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NewUser from './user/pages/users';

const App = () => {
  return (
    <Router>
      {/* <Route path="/" exact compinent={NewUser}></Route> */}
      <NewUser/>
    </Router>
  );
};

export default App;
