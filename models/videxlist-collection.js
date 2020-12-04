'use strict';

const _ = require('lodash');
const JsonCollection = require('./json-collection');
const cloudinary = require('cloudinary');
const path = require('path');
const logger = require('../utils/logger');

try{
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e){
  logger.info('You must use credentials');
  process.exit(1);
}

const videxlistCollection = {

  jsoncollection: new JsonCollection('./models/videxlist-collection.json', {totalListings: [] }),
  collection: 'totalListings',
  
  getAllVidexLists(){
  return this.jsoncollection.findAll(this.collection);
  },
  
  getVidexlist(id){
    return this.jsoncollection.findOneBy(this.collection, {id: id});
  },
  
  removeVidexlist(id){
    const videxlist = this.getVidexlist(id);
    this.jsoncollection.remove(this.collection, videxlist);
  },
  
  removecontents(id, contentsId){
    const videxlist = this.getVidexlist(id);
    const contents = videxlist.contents;
    _.remove(contents, {id: contentsId});
  },
  
  addItem(id, item){
    const videxlist = this.getVidexlist(id);
    videxlist.contents.push(item);
  },
  
  addVidexlist(videxlist, response){
    videxlist.photo.mv('tempimage', err=>{
      if(!err){
        cloudinary.uploader.upload('tempimage', result=>{
          videxlist.photo = result.url;
    this.jsoncollection.add(this.collection, videxlist);
          response();
        });
      }
    });
  },
  
  removeAllVidexlists(){
    this.jsoncollection.removeAll(this.collection);
  },
  
  editItem(id, contentsId, contentDetails){
    const videxlist = this.getVidexlist(id);
    const contents = videxlist.contents;
    const thepos = contents.findIndex(field=> field.id === contentsId);
    contents[thepos].tag = contentDetails.tag;
    contents[thepos].site = contentDetails.site;
    contents[thepos].link = contentDetails.link;
},
  
  getLoginVidexlists(loginid){
    return this.jsoncollection.findBy(this.collection, {loginid: loginid});
  },
};

module.exports = videxlistCollection;