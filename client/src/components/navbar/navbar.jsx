import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {

        }

    }

  render() {
      // console.log('Login state', this.state);
    return (
        <React.Fragment>
        <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">Lunch Buddy Finder</a>
    </div>
    <ul className="nav navbar-nav">
      <li><NavLink to="/home" className="nav-element">Home</NavLink></li>
      <li><NavLink to="/search"className="nav-element">Search Lunch Buddies</NavLink></li>
      <li><NavLink to="/login" className="nav-element">Logout</NavLink></li>
      <li style={{ left: "150%", 'font-weight': '800', 'font-size': '24px' }}><a>{Cookies.get('username')}</a></li>
    </ul>

  </div>
</nav>
</React.Fragment>
    );
  }
}


export default Navbar;