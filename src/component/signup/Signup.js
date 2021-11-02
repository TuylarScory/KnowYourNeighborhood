import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../service/StoreService';
import Alert from 'react-s-alert';

export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;


class Signup extends Component {

    render() {

        if(this.props.authenticated) {

            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }

            }}/>;            
        }

        return (

            <div class="container mt-2 mb-5">
                <div class="row">
                    <div class="col-sm-12">
                        <SignupForm {...this.props} />

                        <h3>OR</h3>
                        <br/>

                        <SocialSignup />
                    </div>

                        

                    
                </div>
            </div>
        );
    }
}

//Social SignUp form 
class SocialSignup extends Component {

    render() {

        return (
            
            <div className="div-btn">
                <a className="social-btn" href={GOOGLE_AUTH_URL}>Sign up with Google</a>
            </div>

        );
    }
}
 
//Local SignUp Form
class SignupForm extends Component {

    constructor(props) {

        super(props);
        this.state = {

            userName: '',
            email: '',
            password: ''

        }

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

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {

            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");

        }).catch(error => {

            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');   

        });
    }

    render() {
        return ( 
            <form onSubmit={this.handleSubmit}>

                <h3 className="text">Create account</h3>
                
                <div className="div">
                    <input type="text" name="userName" 
                            className="control" placeholder="Name"
                            value={this.state.userName} onChange={this.handleInputChange} required/>
                </div>

                <div className="div">
                    <input type="email" name="email" 
                            className="control" placeholder="Email"
                            value={this.state.email} onChange={this.handleInputChange} required/>
                </div>

                <div className="div">
                    <input type="password" name="password" 
                            className="control" placeholder="Password"
                            value={this.state.password} onChange={this.handleInputChange} required/>
                </div>

                <div className="div-btn">
                    <button type="submit" className="btnn">Sign Up</button>
                </div>

                <div className="div-text">
                    <h5><b>Already have an account? </b><Link to="/login" className="aa">Login!</Link></h5> 
                </div>

            </form>                  

        );
    }
}

export default Signup