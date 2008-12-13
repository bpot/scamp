// ==========================================================================
// Scamp.Artist
// ==========================================================================

require('core');

/** @class

  (Document your class here)

  @extends SC.Record
  @author AuthorName
  @version 0.1
*/
Scamp.Artist = SC.Record.extend(
/** @scope Scamp.Artist.prototype */ {

  // TODO: Add your own code here.
  dataSource: Scamp.server,
  resourceURL: '/sc/artists',

  properties: ['guid','name'],
  primaryKey: 'guid',

  allowsEmptySelection: false,
  allowsMultipleSelection: false,

  albums: function () {
    
  }
  

}) ;
