'use strict';

const express = require('express');
const router = express.Router();
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const videxlist = require('./controllers/videxlist.js');
const updates = require('./controllers/updates.js');
const accounts = require('./controllers/accounts.js');
const comment = require('./controllers/comment.js');

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/comment/:id', comment.index);

router.get('/about', about.index);
router.post('/about/addcomment', about.addComment);

router.get('/videxlist/:id', videxlist.index);
router.get('/videxlist/deletetotal/:id', videxlist.deletetotal);

router.get('/updates/:id', updates.index);
router.get('/updates/:id/deletelisting/:contentsId', updates.deletelisting);
router.post('/updates/:id/additem', updates.addItem);
router.post('/updates/:id/updateitem/:contentsId', updates.updateItem); 

router.post('/dashboard/addvidexlist', dashboard.addVidexlist);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;