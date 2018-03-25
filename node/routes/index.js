module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/node/');
    });
    app.use('/node/', require('./home'));
    app.use('/node/login', require('./login')(app.io));
    app.use('/node/user', require('./user'));
    app.use('/node/classifications', require('./classifications'));
    app.use('/node/courses', require('./courses'));
    app.use('/node/teacher', require('./teacher'));
    app.use('/node/person', require('./person'));
};
