import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import AddUser from './components/users';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <AddUser />
      </div>
    </Router>
  );
};

export default App;
