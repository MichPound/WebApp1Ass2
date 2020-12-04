'use strict';

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const commentCollection = require('../models/comment-collection');
const uuid = require('uuid');
const when = new Date();

const about = {
  index(request, response) {
    const loggedInLogin = accounts.getCurrentLogin(request);
    const commonId = request.params.id;
    
    logger.info('about rendering');
    const viewData = {
      title: 'Videx Playlist',
      comments: commentCollection.getAllComments(),
      fullname: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
    };
    response.render('about', viewData);
  },
  
  addComment(request, response){
    const loggedInLogin = accounts.getCurrentLogin(request);
    const newComment = {
      id: uuid(),
      loginid: loggedInLogin.id,
      title: request.body.title,
      name: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
      date: when,
    };
    commentCollection.addComment(newComment);
    response.redirect('/about');
  },
};
  
module.exports = about;