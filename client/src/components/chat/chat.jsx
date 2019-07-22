import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import styles from './style.scss';

class Chat extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        $(function() {
                var socket = io.connect();
                var $messageForm = $('#messageForm');
                var $message = $('#message');
                var $chat = $('#chat');
                var $messageArea = $('#messageArea');
                var $userFormArea = $('#userFormArea');
                var $userForm = $('#userForm');
                var $users = $('#users');
                var $username = $('#username');


                $messageForm.submit(function(e) {
                    e.preventDefault();
                    socket.emit('send message', $message.val());
                    $message.val('');
                });


                socket.on('new message', function(data) {
                    $chat.append('<div class="well"><strong>' +data.user+'</strong>: '+data.msg+'</div>');
                });


                $userForm.submit(function(e) {
                    console.log("form submitted")
                    e.preventDefault();
                    socket.emit('new user', $username.val(), function(data) {
                        if(data) {
                            $userFormArea.hide();
                            $messageArea.show();
                        }
                    });
                    $username.val('');
                });


                socket.on('get users', function(data) {
                    var html = '';
                    for(var i=0; i<data.length; i++) {
                        html += '<li class="list-group-item">' + data[i] + '</li>';
                    }
                    $users.html(html);
                });

            });
    }

    render() {
        return (
            <html>
    <head>
        <title>IO Chat</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
    </head>
    <body style={{"margin-top":"40px"}}>
        <div className="container">
            <div id="userFormArea" className="row">
                <div className="col-md-12">
                    <form id="userForm">
                                <div className="form-group">
                                    <label>Enter Username</label>
                                    <input className="form-control" id="username" required />
                                    <br/>
                                    <input type="submit" className="btn btn-primary" value="Login" />
                                </div>
                            </form>
                </div>
            </div>

            <div id="messageArea" className="row">
                <div className="col-md-4">
                    <div className="well">
                        <h3>Online Users</h3>
                        <ul className="list-group"id="users"></ul>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="chat" id="chat">
                            <form id="messageForm">
                                <div className="form-group">
                                    <label>Enter message</label>
                                    <input type="text" className="form-control" id="message" required />
                                    <br/>
                                    <input type="submit" className="btn btn-primary" value="Send Message" />
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
        );
    }
}

export default Chat;