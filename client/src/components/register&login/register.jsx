import React from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import Layout from '../layout/layout'


class Register extends React.Component {
   constructor() {
       super()
       this.locationChangeTimeout = null;
       this.state = {
           registerError: false,
           username: '',
           password: '',
           location: '',
           latitude: 0,
           longitude: 0,
           photo: '',
           food: '',
           gender: '',
           age: 0,
           redirect: false,
       }
       this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);

   }

   handleLocationChange(e){
       clearTimeout(this.locationChangeTimeout);
       var location = e.target.value;
       this.locationChangeTimeout = setTimeout(() => {
       console.log('this', this);
       axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                           headers: {
                                'Content-Type': 'application/json',
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            params: {
                                address: location,
                                key: 'AIzaSyD_VlYXiXK8cp9x_t1LL6vAU5a4KP9gt3g'
                            }
                        })
                        .then(response => {
                            console.log(response);
                            console.log('this', this);
                            console.log(response.data.results[0].geometry.location);
                            this.setState({
                                latitude: response.data.results[0].geometry.location.lat,
                                longitude: response.data.results[0].geometry.location.lng,
                            })
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
       }, 2000)

    }

   handleChange(e){
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

   handleSubmit(e,v) {
       e.preventDefault();
       fetch('/register', {
           method: 'POST',
           headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                location: this.state.location,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                photo: this.state.photo,
                food: this.state.food,
                gender: this.state.gender,
                age: this.state.age,
            })
       })
       .then(response => response.json())
       .then(json => {
           console.log('register success', json);
           this.setState({redirect: true})
       })
       .catch(err => this.setState({registerError: true}))
   }




    render(){
          if (this.state.redirect) return <Redirect to="/login" />;
        return (
             <Layout>
                <h1>Registration</h1>
                <br/>
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                    Enter username <input name="username" className="form-control" onChange={this.handleChange}/><br/>
                    Enter password <input type="password" name="password" className="form-control" onChange={this.handleChange}/><br/>
                    Enter location <input name="location" className="form-control" onChange={this.handleLocationChange}/><br/>
                    Latitude: <input value={this.state.latitude} />
                    Longitude: <input value={this.state.longitude} /><br/><br/>
                    Enter photo <input name="photo" className="form-control" onChange={this.handleChange}/><br/>
                    Enter food <input name="food" className="form-control" onChange={this.handleChange}/><br/>
                    Enter gender <input name="gender" className="form-control" onChange={this.handleChange}/><br/>
                    Enter age <input name="age" className="form-control" onChange={this.handleChange}/><br/>
                    <input id="createAcc" type="submit" className="btn btn-primary" value="Create Account"/>
                </form>
                </div>
             </Layout>
        );
    }
}

export default Register;