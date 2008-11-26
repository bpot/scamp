// ==========================================================================
// Scamp.Album
// ==========================================================================

require('core');

/** @class

  (Document your class here)

  @extends SC.Record
  @author AuthorName
  @version 0.1
*/
Scamp.Album = SC.Record.extend(
/** @scope Scamp.Album.prototype */ {

  // TODO: Add your own code here.
  dataSource: Scamp.server,
  resourceURL: 'sc/albums',

  properties: ['guid','title','artist'],
  primaryKey: 'guid'

}) ;
