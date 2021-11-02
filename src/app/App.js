import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../app/NotFound';
import LoadingIndicator from '../app/LoadingIndicator';
import { getCurrentUser } from '../service/StoreService';
import PrivateRoute from '../app/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import OAuth2RedirectHandler from '../component/oauth2/OAuth2RedirectHandler';
import AppHeader from '../app/AppHeader';
import Home from '../home/Home';
import Login from '../component/login/Login';
import Signup from '../component/signup/Signup';
import Profile from '../component/profile/Profile';
import ViewStore from '../component/view/ViewStore';
import SearchStore from '../component/search/SearchStore';
import GetStore from '../component/get/GetStore';
import AppFooter from './AppFooter';
import About from '../component/about/About';
import Terms from '../component/t&c/Terms';
import Contact from '../component/contact/Contact';


export const ACCESS_TOKEN = 'accessToken';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        currentUser: null,
        loading: false
      }
  
      this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }
  
    loadCurrentlyLoggedInUser() {
      this.setState({
        loading: true
      });
  
      getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      }).catch(error => {
        this.setState({
          loading: false
        });  
      });  
      
      
      
  
    }
    
  
    handleLogout() {
      localStorage.removeItem(ACCESS_TOKEN);
      this.setState({
        authenticated: false,
        currentUser: null
      });
      Alert.success("You're safely logged out!");
    }
  
    componentDidMount() {
      this.loadCurrentlyLoggedInUser();
    }

  render() {
    if(this.state.loading) {

      return <LoadingIndicator />

    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>

        <div className="app-body">

          <Switch>

            <Route exact path="/" component={Home}></Route>  

            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>

            <PrivateRoute path="/view" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={ViewStore}></PrivateRoute>

            <PrivateRoute path="/store/search/:key" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={SearchStore}></PrivateRoute>

            <PrivateRoute path="/get/:sId" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={GetStore}></PrivateRoute>
            
            <Route path="/contact" component={Contact}></Route>  

            <Route path="/about" component={About}></Route>  

            <Route path="/tc" component={Terms}></Route>  
              
            <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>

            <Route path="/signup" render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>

            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  

            <Route component={NotFound}></Route>

          </Switch>

        </div>

        <div className="app-bottom">
          <AppFooter authenticated={this.state.authenticated}/>
        </div>

        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
          
      </div>
    );
  }
}

export default App;
