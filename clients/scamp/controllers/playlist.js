// ==========================================================================
// Scamp.PlaylistController
// ==========================================================================

require('core');

/** @class

  (Document Your View Here)

  @extends SC.Object
  @author AuthorName
  @version 0.1
  @static
*/
Scamp.playlistController = SC.CollectionController.create(
/** @scope Scamp.playlistController */ {

  // TODO: Add your own code here.
  addAlbum: function(content) {
    var path = "/sc/add_album/" + encodeURIComponent(content.get('artist') + ";" + content.get('title'));
    new Ajax.Request(path, {method: 'GET', onComplete: function(transport) { Scamp.server.listFor({recordType: Scamp.Playlist}) }} );
  },

  play: function(content) {
    var path = "/sc/play/" + encodeURIComponent(content.get('pos'));
    new Ajax.Request(path, {method: 'GET', onComplete: function(transport) { Scamp.server.listFor({recordType: Scamp.Status,callback: function() {
        Scamp.statusController.set('content', Scamp.Status.find(1));
      }
 }) }});
  }

});
