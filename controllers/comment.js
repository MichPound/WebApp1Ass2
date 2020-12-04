const uuid = require('uuid');

'use strict';

const logger = require('../utils/logger');
const commentCollection = require('../models/comment-collection');
const accounts = require('./accounts.js');

const comment = {
  index(request, response){
    const loggedInLogin = accounts.getCurrentLogin(request);
    const commentId = request.params.id;
    logger.debug('Comment id = ', commentId);
    if(loggedInLogin){
    const viewData = {
      title: 'Comment',
      comment: commentCollection.getComment(commentId),
      fullname: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
    };
    response.render('comment', viewData);
      }
    else response.redirect('/');
  },
  
  deletetotal(request, response){
    const commentId = request.params.id;
    logger.debug(`Deleteing Total ${commentId}`);
    commentCollection.removeComment(commentId);
    response.redirect('/about/');
  },
  
};

module.exports = comment;