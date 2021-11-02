import React, { Component } from 'react';
import './Login.css';
import { login } from '../../service/StoreService';
import { Link, Redirect } from 'react-router-dom'
import Alert from 'react-s-alert';
import store from '../../img/Neighbor.jpg';

export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const ACCESS_TOKEN = 'accessToken';

 
class Login extends Component {

    componentDidMount() {

        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {

            setTimeout(() => {

                Alert.error(this.props.location.state.error, {
                    timeout: 5000

                });

                this.props.history.replace({

                    pathname: this.props.location.pathname,
                    state: {}

                });
            }, 100);
        }
    }
    
    render() {

        if(this.props.authenticated) {

            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }

            }}/>;            
        }

        return (

            <div class="container mb-5 mt-4">
                 <div class="row">

                     <div class="col-sm-6">
                        <img src={store} alt="Neighbor" className="img"></img>
                     </div>

                     <div class="col-sm-6">
                        <LoginForm {...this.props} />

                        <div className="ldiv-text">
                            <a className="la" href="#">Forgort Password?</a>
                            <h5><b>Don't have an account? </b><Link to="/signup" className="laa">Register Here!</Link></h5> 
                        </div>

                         <h3>OR</h3>
                         <br/>

                         <SocialLogin />
                     </div>
                    

                 </div>
             </div>
        );
    }
}

//Social Login Form
class SocialLogin extends Component {

    render() {

        return (

            <div className="ldiv-btn">
                             <a className="lsocial-btn" href={GOOGLE_AUTH_URL}>Login with Google</a>
                         </div>
        );
    }
}

//Local LoginForm
class LoginForm extends Component {

    constructor(props) {

        super(props);
        this.state = {

            email: '',
            password: ''

        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {

        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({

            [inputName] : inputValue

        });        
    }

    handleSubmit(event) {

        event.preventDefault();   

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {

            localStorage.setItem(ACCESS_TOKEN, response.accessToken);

            Alert.success("You're successfully logged in!");

            Alert.success("Refresh the page!!!");

            this.props.history.push(`/profile`);

            console.log("Profile link")

        }).catch(error => {

            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');

        });
    }
    
    render() {
        return ( 
            <form onSubmit={this.handleSubmit}>
                            
                <h3 className="ltext">Sign into your account</h3>
                    
                <div className="ldiv">
                <input type="email" name="email" 
                        className="lcontrol" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>

                <div className="ldiv">
                <input type="password" name="password" 
                        className="lcontrol" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>

                <div className="ldiv-btn">
                    <button type="submit" className="lbtnn">Login</button>
                </div>
                  
            </form>   
            
        );
    }
}

export default Login


