const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const SALT = 'secretsauce'; // cannot change

module.exports = dbPoolInstance => {
    // let getAll = (req, callback) => {
    //     db.query(`SELECT * FROM movies`, (err, result) => {
    //         if (err) {
    //             callback(err, null);
    //         }
    //         if (result.rows){
    //             callback(null, result.rows);
    //         } else {
    //             callback(null, null);
    //         }
    //     })
    // }

    let getAllUsers = (user, callback) => {
        const currentUser = user;

        let queryString = "SELECT * FROM users WHERE username !=$1";

        let values = [currentUser];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                callback(null,queryResult);
            }
        });

    }

    let addNewUser = (data, callback) => {

        const username = data.username;
        const password = data.password;
        const location = data.location;
        const latitude = data.latitude;
        const longitude = data.longitude;
        const photo = data.photo;
        const food = data.food;
        const gender = data.gender;
        const age = parseInt(data.age);
        // const hash = sha256(data.password + SALT);

        let queryString = "INSERT INTO users (username, password, latitude, longitude, photo, food, gender, age) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

        let values = [username, password, location, latitude, longitude, photo, food, gender, age];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                callback(null,queryResult);
            }
        });

    }


    let authenticateUser = (data, callback) => {

        const username = data.username;
        const password = data.password;
        console.log(username)
        console.log(password)
        // const hash = sha256(data.password + SALT);

        const queryString = "SELECT * FROM users WHERE username=$1 AND password=$2";

        const values = [username, password];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                if(queryResult.rows.length === 1) {
                    callback(null, queryResult);
                } else {
                    callback(null,null);
                }
            }
        });
    };


    let inviteUser = (data, callback) => {
        console.log("FROM USER", data.from_user);
        console.log("TO USER", data.to_user);

        const queryString = "INSERT INTO invites (from_user, to_user , accept_invite, reject_invite) VALUES ($1, $2, $3, $4) RETURNING *";

        const values = [data.from_user, data.to_user, false, false];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                if(queryResult.rows.length === 1) {
                    callback(null, queryResult);
                } else {
                    callback(null,null);
                }
            }
        });
    };



    let getAllInvites = (data, callback) => {

        const queryString = "SELECT * FROM invites WHERE to_user=$1 OR from_user=$1";

        const values = [data];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                if(queryResult.rows.length !== 0) {
                    callback(null, queryResult);
                } else {
                    callback(null,null);
                }
            }
        });
    };


    let acceptInvite = (data, callback) => {

        const queryString = "UPDATE invites SET accept_invite=$1 WHERE from_user=$2 AND to_user=$3 RETURNING *";

        const values = [true, data.from_user, data.to_user];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                if(queryResult.rows.length === 1) {
                    callback(null, queryResult);
                } else {
                    callback(null,null);
                }
            }
        });
    };


    let rejectInvite = (data, callback) => {

        const queryString = "UPDATE invites SET reject_invite=$1 WHERE from_user=$2 AND to_user=$3 RETURNING *";

        const values = [true, data.from_user, data.to_user];

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                callback(error,null);
            } else {
                if(queryResult.rows.length === 1) {
                    callback(null, queryResult);
                } else {
                    callback(null,null);
                }
            }
        });
    };

    return {
        getAllUsers,
        authenticateUser,
        addNewUser,
        inviteUser,
        getAllInvites,
        acceptInvite,
        rejectInvite
    }
}