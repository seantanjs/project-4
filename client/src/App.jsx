import React, { Component } from 'react';
import './App.css';
import Login from './components/register&login/login';
import Register from './components/register&login/register';
import Home from './components/home/home';
import Search from './components/search/search';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {

	constructor(){
		super();
		this.state = {
			// someState: null,
           username: '',
           password: '',
           location: '',
           latitude: 0,
           longitude: 0,
           photo: '',
           food: '',
           gender: '',
           age: 0,
           redirect: false
		}
        this.setCurrentUser = this.setCurrentUser.bind(this);
	}

	componentDidMount(){
	}

    setCurrentUser(user){
        console.log("HELLO");
        this.setState({
            username: user.username,
            password: user.password,
            location: user.location,
            latitude: user.latitude,
            longitude: user.longitude,
            photo: user.photo,
            food: user.food,
            gender: user.gender,
            age: user.age
        });
        console.log(this.state);
    }



	render() {
        console.log("THIS STATE", this.state)
		return (
            <Router>
                <Route path="/login" component={() => <Login setCurrentUser={this.setCurrentUser} redirect={this.state.redirect} />} />
                <Route path="/register" component={Register}/>
                <Route path="/home" component={()=> <Home userData={this.state} />}/>
                <Route path="/search" component={()=><Search userData={this.state} />}/>
            </Router>
		);
	}
}

export default App;