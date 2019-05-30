import React from 'react';
import styles from './style.scss';


class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            photo: "",
            username: ""
        }
    }


  render() {
      // console.log("PROPS",this.props.userPhoto);
      if(this.props.show == false) return <div></div>
      if(this.props.show == true)  return (

          <div className="modal-main">
             <img className="image" src={this.props.userPhoto} alt="fail to load"/>
              <br/>
            <button id="close" className="btn btn-danger" onClick={this.props.handleClose}>close</button>
          </div>

      );

    };
}


export default Modal;