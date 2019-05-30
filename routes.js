module.exports = (app, db) => {
    const something = require('./controllers/something')(db);
    // app.get('/somenonsense', something.getAll);

    app.get('/users', something.getAllUsers);

    app.post('/register', something.registerUser);

    app.post('/login', something.loginUser);

    app.post('/invite', something.inviteUser);

    app.get('/allInvites/:id', something.getAllInvites);

    app.post('/invite/accept', something.acceptInvite);
    app.post('/invite/reject', something.rejectInvite);

}