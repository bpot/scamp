// ==========================================================================
// Scamp.Status
// ==========================================================================

require('core');

/** @class

  (Document your class here)

  @extends SC.Record
  @author AuthorName
  @version 0.1
*/
Scamp.Status = SC.Record.extend(
/** @scope Scamp.Status.prototype */ {
  dataSource: Scamp.server,
  resourceURL: '/sc/status',

  properties: ['guid','bitrate','state','songid','time','song'],
  primaryKey: 'guid',
    

  title: function() {
    return Scamp.Playlist.find(this.get('song')).get('title');
  }.property('song'),

  artist: function() {
    return Scamp.Playlist.find(this.get('song')).get('artist');
  }.property('song'),

}) ;
