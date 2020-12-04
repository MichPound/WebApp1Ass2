'use strict';

const _ = require('lodash');
const JsonCollection = require('./json-collection');
const commentCollection = {

  jsoncollection: new JsonCollection('./models/comment-collection.json', {comments: [] }),
  collection: 'comments',
  
  getAllComments(){
  return this.jsoncollection.findAll(this.collection);
  },
  
  getComment(id){
    return this.jsoncollection.findOneBy(this.collection, {id: id});
  },
  
  addComment(comment){
    this.jsoncollection.add(this.collection, comment);
  },
  
  getLoginComments(loginid){
    return this.jsoncollection.findBy(this.collection, {loginid: loginid});
  },
};

module.exports = commentCollection;