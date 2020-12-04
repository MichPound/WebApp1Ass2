const uuid = require('uuid');

'use strict';

const logger = require('../utils/logger');
const videxlistCollection = require('../models/videxlist-collection');

  const updates = {
  index(request, response){
    const videxlistId = request.params.id;
    logger.debug('Videxlist id = ', videxlistId);
    const viewData = {
      title: 'Update',
      videxlist: videxlistCollection.getVidexlist(videxlistId),
    };
    response.render('updates', viewData);
  },
    
    deletelisting(request, response){
    const videxlistId = request.params.id;
    const contentsId = request.params.contentsId;
    logger.debug(`Deleteing Listing ${contentsId} from Videxlist ${videxlistId}`);
    videxlistCollection.removecontents(videxlistId, contentsId);
    response.redirect('/updates/' + videxlistId);
  },
    
    addItem(request, response){
    const videxlistId = request.params.id;
    const videxlist = videxlistCollection.getVidexlist(videxlistId);
    const newItem = {
      id: uuid(),
      tag: request.body.tag,
      site: request.body.site,
      link: request.body.link,
    };
    videxlistCollection.addItem(videxlistId, newItem);
    response.redirect('/updates/' + videxlistId);
  },
    
    updateItem(request, response){
      const videxlistId = request.params.id;
      const contentsId = request.params.contentsId;
      logger.debug("updating item" + contentsId);
      const changeItem = {
        tag: request.body.tag,
        site: request.body.site,
        link: request.body.link,
      };
      videxlistCollection.editItem(videxlistId, contentsId, changeItem);
      response.redirect('/updates/' + videxlistId);
    },
};

module.exports = updates;