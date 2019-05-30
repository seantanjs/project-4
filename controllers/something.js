const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const SALT = 'secretsauce'; // cannot change

module.exports = db => {
    // let getAll = (req, res) => {
    //     db.something.getAll(req, (err, result) => {
    //         !err ? res.status(200).send(result) : console.error(err);
    //     })
    // }

   let getAllUsers = (request, response) => {
      const currentUser = request.cookies["username"];
    // const hash = sha256(request.body.password + SALT);

    db.something.getAllUsers(currentUser , (err, result) => {
        if(err !== null) {
            console.log("query error test 0");
            response.status(500).send('Error');
        } else {
            console.log("HERE HERE HERE",result.rows);
            response.send({queryRes: result.rows});
        }
    });
  };


  let registerUser = (request, response) => {
      console.log('register request.body', request.body);
    const username = request.body.username;
    // const hash = sha256(request.body.password + SALT);

    db.something.addNewUser( request.body, (err, result) => {
        if(err !== null) {
            console.log("query error test 1");
            response.status(500).send('Error');
        } else {
            response.send({result: result.rows[0]});
        }
    });
  };


  // let renderLoginForm = (request, response) => {
  //       response.render('login');
  // };


  let loginUser = (request, response) => {
      console.log('login request.body', request.body);
    const username = request.body.username;
    // const hash = sha256(request.body.password + SALT);

    db.something.authenticateUser( request.body, (err, result) => {
                if(err !== null) {
                    console.log("query error test 2");
                    response.status(500).send('Error');
                } else if(result !== null) {
                    // const logInHash = sha256(username + SALT);
                    response.cookie('userId', result.rows[0].id);
                    response.cookie('username', result.rows[0].username);
                    response.cookie('photo', result.rows[0].photo);
                    response.cookie('age', result.rows[0].age);
                    response.cookie('gender', result.rows[0].gender);
                    response.cookie('food', result.rows[0].food);
                    response.cookie('location', result.rows[0].location);
                    response.cookie('latitude', result.rows[0].latitude);
                    response.cookie('longitude', result.rows[0].longitude);
                    // response.cookie('logIn', logInHash);


                    // response.redirect('home');
                    response.send({result: result.rows[0]});
                } else if(err === null && result === null) {
                    // response.render("loginFail");
                    response.send(err);
                }

    });
  };


  let inviteUser = (request, response) => {
      console.log('request.body', request.body);


    db.something.inviteUser( request.body, (err, result) => {
        if(err !== null) {
            console.log("query error test 3");
            response.status(500).send(err);
        } else {
            console.log(result.rows[0])
            response.send({result: result.rows[0]});
        }
    });
  };

  let getAllInvites = (request, response) => {
      console.log('request.params', request.params.id);


    db.something.getAllInvites( parseInt(request.params.id), (err, result) => {
        if(err !== null) {
            console.log("query error test 4");
            response.status(500).send(err);
        } else {
            if (result === null) response.send({result: null})
                else response.send({result: result.rows})
            // console.log(result)
            // response.send({result: result.rows});
        }
    });
  };


  let acceptInvite = (request, response) => {
      console.log('request body', request.body);


    db.something.acceptInvite( request.body, (err, result) => {
        if(err !== null) {
            console.log("query error test 5");
            response.status(500).send(err);
        } else {
            console.log(result.rows[0])
            response.send({result: result.rows[0]});
            // console.log(result)
            // response.send({result: result.rows});
        }
    });
  };


  let rejectInvite = (request, response) => {
      console.log('request body', request.body);

    db.something.rejectInvite( request.body, (err, result) => {
        if(err !== null) {
            console.log("query error test 6");
            response.status(500).send(err);
        } else {
            console.log(result.rows[0])
            response.send({result: result.rows[0]});
            // console.log(result)
            // response.send({result: result.rows});
        }
    });
  };

    return {
        getAllUsers,
        registerUser,
        loginUser,
        inviteUser,
        getAllInvites,
        acceptInvite,
        rejectInvite
    }
};