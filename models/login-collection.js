'use strict'

const _ = require('lodash');
const JsonCollection = require('./json-collection');
const loginCollection = {
  
  store: new JsonCollection('./models/login-collection.json',{logins: []}),
  collection: 'logins',
  
  getAllLogins(){
    return this.store.findAll(this.collection);
  },
  
  addLogin(login){
    this.store.add(this.collection, login);
  },
  
  getLoginById(id){
    return this.store.findOneBy(this.collection, {id: id});
  },
  
  getLoginByEmail(email){
    return this.store.findOneBy(this.collection, {email: email});
  },
}

module.exports = loginCollection;