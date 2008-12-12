// ==========================================================================
// Scamp.StatusController
// ==========================================================================

require('core');

/** @class

  (Document Your View Here)

  @extends SC.Object
  @author AuthorName
  @version 0.1
  @static
*/
Scamp.statusController = SC.ObjectController.create(
/** @scope Scamp.statusController */ {
  allowsMultipleContent: false,

  // TODO: Add your own code here.
  //bitrate: "192",
  //state: "pause"
  updateDatabase: function() {
    var path = "/sc/refresh";
    new Ajax.Request(path, {method: 'GET' });
      //onComplete: function(transport) { Scamp.server.listFor({recordType: Scamp.Playlist}) }
   // } );
  
  },

  togglePlay: function() {
    var path = "/sc/refresh";
    new Ajax.Request(path, {method: 'GET' });
  },

  playButtonObserver: function() {
                      }.observes('')

}) ;
