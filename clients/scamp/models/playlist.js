// ==========================================================================
// Scamp.Playlist
// ==========================================================================

require('core');

/** @class

  (Document your class here)

  @extends SC.Record
  @author AuthorName
  @version 0.1
*/
Scamp.Playlist = SC.Record.extend(
/** @scope Scamp.Playlist.prototype */ {
  dataSource: Scamp.server,
  resourceURL: '/sc/playlist',

  properties: ['guid','artist','title','pos','id'],
  primaryKey: 'guid',
  artist_song: function() {
    if(Scamp.statusController.get('song') == this.get('pos')) {
      return this.get('pos') + " - " + Scamp.statusController.get('song') + " - " + this.get('artist') + " - " + this.get('title') + "(NOW PLAYING!!!)";
    } else {
      return  this.get('pos') + " - " + Scamp.statusController.get('song') + " - " + this.get('artist') + " - " + this.get('title');
    }
  }.property('artist','title','Scamp.statusController.song'),

  // TODO: Add your own code here.

}) ;
