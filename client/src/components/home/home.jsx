import React from 'react';
import Navbar from '../navbar/navbar';
import Layout from '../layout/layout';
import styles from './style.scss';
import Cookies from 'js-cookie';
import Profile from '../profile/profile';



class Home extends React.Component {
    constructor(){
        super();
        this.state = {
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

    }

    componentDidMount(){
    }

  render() {
      console.log('Login state', this.state);
      console.log('userData', this.props.userData);

    return (
        <Layout>
            <Navbar />
            <Profile />
        </Layout>
    );
  }
}

export default Home;