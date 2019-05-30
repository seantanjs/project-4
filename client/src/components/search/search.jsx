import React from 'react';
import Navbar from '../navbar/navbar';
import Layout from '../layout/layout';
import Cookies from 'js-cookie';
import styles from './style.scss';
import Modal from '../modal/modal'
import Row from '../row/row';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";


class Map extends React.Component {

    constructor(){
        super();
        this.state={
            googleMap:null,
        }
    }

    componentDidUpdate(prev){
        console.log(this.props.users)

        if (this.props.users.length !== prev.users.length) {
            this.props.users.forEach(user => {
                this.setMarker(user, this.state.googleMap, parseFloat(user.latitude), parseFloat(user.longitude));
            })
        }
    }

    componentDidMount() {
        this.initializeMap();
    }

    initializeMap(){
        if(window.google) {
                   let map = new window.google.maps.Map(document.getElementById('google-map'),{
                              center:{lat: 1.373943,lng: 103.809903 },
                              zoom:11.5
                           });
           console.log("created map")
           this.setState({googleMap:map})

          // initialize Current logged in user location and details

           var marker = new window.google.maps.Marker({
                position: { lat: parseFloat(Cookies.get('latitude')) , lng: parseFloat(Cookies.get('longitude')) },
                map: map,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10
                }
            });

            marker.setMap(map);


            var infowindow = new window.google.maps.InfoWindow({
               content: '<Strong>YOU</Strong>' + '</p>' + '<p>Location: ' + Cookies.get('location') + '</p>'
            });

            window.google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

           // initialize Current logged in user location and details

        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        // console.log(lat1); //1.274250
        // console.log(lon1); //103.845410
        // console.log(lat2);
        // console.log(lon2);

        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2-lat1) * Math.PI / 180;
        var dLon = (lon2-lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

            return Math.round(d*1000)+" m";
    }

    buildInfoWindow(user, map, marker, distance) {

        var infowindow = new window.google.maps.InfoWindow({
           content: '<p>Name: ' + user.username + '</p>' + '<p>Age: ' + user.age + '</p>' + '<p>Gender: ' + user.gender + '</p>' + '<p>Location: ' + user.location + '</p>' + '<p>Distance from you: ' + distance + '</p>'
        });

        window.google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }

    setMarker(user, map, lat, lng) {
        let distance = this.calculateDistance( lat, lng, parseFloat(Cookies.get('latitude')), parseFloat(Cookies.get('longitude')) );

        const marker = new window.google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        })
        marker.setMap(map)
        this.buildInfoWindow(user, map, marker, distance);


    }

    render(){
        console.log('MAP PROPS', this.props);
    return (
        <div id="google-map"  style={{width:"1000px", height:"750px"}}></div>
        );
    }
}



class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            users: [],
            show: false,
            allInvites: []
        }

    }

    componentDidMount() {
        // console.log("HERE",Cookies.get('userId'));
        fetch('/users')
        .then(response => response.json())
        .then(json => this.setState({users: json.queryRes}))
        .catch(err => console.log(err))

        fetch('/allInvites/' + Cookies.get('userId'))
        .then(response => response.json())
        .then(json => this.setState({
            allInvites: json.result
        }))
    }

  render() {
      console.log('Login state', this.state.users);
      console.log('received invites', this.state.invitesRec)
      const users = this.state.users.map( (user,index) => {
          // console.log("INSIDE MAP",user.photo);
          return   <Row user={user} index={index} userData={this.props.userData} allInvites={this.state.allInvites} />
      })
    return (
        <Layout>
            <Navbar />
              <h3>Search Page</h3>
              <Modal show={this.state.show} handleClose={this.hideModal}>
                          <p>Modal</p>
                          <p>Data</p>
                        </Modal>
              <div class="tableDiv">
              <table class="table table-striped">
                <thead>
                    <tr>
                        <td scope="col">ID</td>
                        <td scope="col">Name</td>
                        <td scope="col">Age</td>
                        <td scope="col">Gender</td>
                        <td scope="col">Food Likes</td>
                        <td scope="col">Location</td>
                        <td scope="col">Distance from you</td>
                        <td scope="col">View Profile</td>
                        <td scope="col">Send Invite</td>
                    </tr>
                </thead>
            <tbody>
                {users}
            </tbody>
            </table>
               <div>
                   <Map users={this.state.users} />
                </div>
            </div>
         </Layout>
    );
  }
}

export default Search;