const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const assert = require('assert'); 
const { ensureAuthenticated} = require('../config/auth');

router.get('/', (req, res, next) => res.render("Welcome"));

router.get('/dashboard', ensureAuthenticated, (req, res, next) => res.render("dashboard",{
    name: req.user.name
}));

module.exports = router;