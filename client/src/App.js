import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import './App.css';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Camera from './components/Camera/Camera';
import UserInput from './components/UserInput/UserInput';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Maps from './components/Maps/Maps';
import Test from './components/Test/Test';
import Profile from './components/Profile/Profile';

class App extends React.Component {
  render() {
    return (
        <Router>
          <Sidebar/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/Register" component={Register} />
                <Route path="/Login" component={Login} />
                <Route path="/Camera" component={Camera} />
                <Route path="/UserInput" component={UserInput} />
                <Route path="/AboutUs" component={AboutUs} />
                <Route path="/Maps" component={Maps} />
                <Route path="/Test" component={Test} />
                <Route path="/Profile" component={Profile} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
