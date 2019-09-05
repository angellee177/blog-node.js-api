const router = require('express').Router();

// get Home Page
router.get('/handlebars', function(req, res){
    res.render('home');
});
/// get Login Page
router.get('/login', function(req, res){
    res.render('login');
});

module.exports = router;