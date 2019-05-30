import React from 'react';
import Cookies from 'js-cookie';



class Profile extends React.Component {
    constructor(){
        super();
        this.state = {

        }

    }

  render() {

    return (
            <div className="container">
              <h3>Profile Page</h3>
              <div className="profile-container">
              <img style={{'border':'1px solid black'}} src={Cookies.get('photo')} alt="fail to load" />
                  <div className="info-container">
                      <span>Name: {Cookies.get('username')}</span><br/>
                      <span>Age: {Cookies.get('age')}</span><br/>
                      <span>Gender: {Cookies.get('gender')}</span><br/>
                      <span>Food I love: {Cookies.get('food')}</span><br/>
                      <span>Location: {Cookies.get('location')}</span><br/>
                  </div>
              </div>
            </div>
    );
  }
}

export default Profile;