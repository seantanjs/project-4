import React from 'react';
import {Redirect} from 'react-router';
import Layout from '../layout/layout';

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            loginError: false,
            username: '',
            password: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit(e, v){
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('login success', json.result);
            this.setState({redirect: true});
            this.props.setCurrentUser(json.result);
        })
        .catch(err => this.setState({loginError: true}))
    }

  render() {
      console.log('Login state', this.state);
      if (this.state.redirect == true) return <Redirect to="/home" />;
      return (
        <Layout>
                <h1>Login</h1>
                <br/>
                <div className="container">
            <form onSubmit={this.handleSubmit}>
                Username: <input className="form-control" name="username" onChange={this.handleChange} /><br/>
                {
                    this.state.loginError === true ?
                    <div className="invalid-feedback" style={{display: 'block'}}>
                        Incorrect username or password
                    </div> :
                    null
                }
                Password: <input type="password" className="form-control" name="password" onChange={this.handleChange}/><br/>
                {
                    this.state.loginError === true ?
                    <div className="invalid-feedback" style={{display: 'block'}}>
                        Incorrect username or password
                    </div> :
                    null
                }
                <input className="btn btn-primary" type="submit" value="Login"/>
            </form>
            <a href="/register">Register New Account</a>
            </div>
         </Layout>
    );
  }
}

export default Login;