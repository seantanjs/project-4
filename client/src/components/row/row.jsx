import React from 'react';
import Navbar from '../navbar/navbar';
import Cookies from 'js-cookie';
import Modal from '../modal/modal';
import styles from './style.scss';


class Row extends React.Component {
    constructor(){
        super();
        this.state = {
            users: [],
            show: false,
            sendInvite: false,
            acceptInvite: false,
            rejectInvite: false,
        }
        this.calculateDistance = this.calculateDistance.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
        this.buttonToDisplay = this.buttonToDisplay.bind(this);

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

    showModal() {
       this.setState({ show: true });
   }

    hideModal() {
        this.setState({ show: false });
    };

    sendInvite(toUser) {
        fetch('/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                to_user: toUser,
                from_user: parseInt(Cookies.get('userId')),
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })

        this.setState({
            sendInvite: true
        })
    }

    acceptInvite(toUser) {
        fetch('/invite/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                to_user: toUser,
                from_user: this.props.user.id,
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })

        this.setState({
            acceptInvite: true
        })
    }

    rejectInvite(toUser) {
        fetch('/invite/reject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                to_user: toUser,
                from_user: this.props.user.id,
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })

        this.setState({
            rejectInvite: true
        })
    }

    buttonToDisplay() {
        console.log("ALLINVITES",this.props.allInvites);
        if(this.props.allInvites !== null) {
            //from receiver point of view
            const relevantInviteRec = this.props.allInvites.find(invite => {
            return parseInt(Cookies.get('userId')) === invite.to_user &&
            this.props.user.id === invite.from_user
            })

            // console.log('RELEVANT INVITE', relevantInviteRec);

            if (relevantInviteRec) {
                 if (relevantInviteRec.accept_invite == true || this.state.acceptInvite == true) {
                   return <p style={{"font-weight":"900","font-size":"24px","color": "green"}}>Accepted! 😁</p>
                } else if(relevantInviteRec.reject_invite == true || this.state.rejectInvite == true) {
                    return <p style={{"font-weight":"900","font-size":"24px","color": "red"}}>Rejected! 😩</p>
                } else {
                    return (
                        <React.Fragment>
                            <button className="btn btn-primary" onClick={()=>this.acceptInvite(parseInt(Cookies.get('userId'))) } >Accept</button>&nbsp;&nbsp;&nbsp;
                            <button className="btn btn-danger" onClick={()=>this.rejectInvite(parseInt(Cookies.get('userId'))) } >Reject</button>
                        </React.Fragment>
                        )
                }
            }

            //from sender point of view
            const relevantInviteSend = this.props.allInvites.find(invite => {
            return parseInt(Cookies.get('userId')) === invite.from_user &&
            this.props.user.id === invite.to_user
            })

            console.log('RELEVANT INVITE', relevantInviteSend);

            if (relevantInviteSend){
                if(relevantInviteSend.accept_invite == true) {
                    return <p style={{"font-weight":"900","font-size":"24px","color": "green"}}>Accepted! 😁</p>
                } else if (relevantInviteSend.reject_invite == true) {
                    return <p style={{"font-weight":"900","font-size":"24px","color": "red"}}>Rejected! 😩</p>
                }
                else {
                    return (
                        <React.Fragment>
                            <button className="btn btn-warning">Pending Accept/Reject</button>
                        </React.Fragment>
                        )
                }
           }


        }

        if(this.state.sendInvite == false) {
            return <button className="btn btn-success" onClick={()=>this.sendInvite(this.props.user.id)}>Have Lunch</button>
        } else if(this.state.sendInvite == true) {
            return <p className="btn btn-warning">Pending Accept/Reject</p>
        }
    }

  render() {
      let buttonToShow = this.buttonToDisplay();
          return (
              <tr>
                    <td>{this.props.index+1}</td>
                    <td>{this.props.user.username}</td>
                    <td>{this.props.user.age}</td>
                    <td>{this.props.user.gender}</td>
                    <td>{this.props.user.food}</td>
                    <td>{this.props.user.location}</td>
                    <td>{this.calculateDistance(this.props.userData.latitude, this.props.userData.longitude, this.props.user.latitude, this.props.user.longitude)}</td>
                    <td>
                        <Modal show={this.state.show} handleClose={this.hideModal} userPhoto={this.props.user.photo}>
                        </Modal>
                        <button className="btn btn-info" onClick={this.showModal}>Click here to view photo!</button>
                    </td>
                    <td>{ buttonToShow }</td>
                </tr>
               );
      }
    }

export default Row;