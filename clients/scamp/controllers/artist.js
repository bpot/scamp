// ==========================================================================
// Scamp.ArtistController
// ==========================================================================

require('core');

/** @class

  (Document Your View Here)

  @extends SC.Object
  @author AuthorName
  @version 0.1
  @static
*/
Scamp.artistController = SC.CollectionController.create(
/** @scope Scamp.artistController */ {

  // TODO: Add your own code here.
  selectionObserver: function() {
    var sel = this.get('selection');

    col = Scamp.albumController.get('content');
    if(sel && sel.length == 1 && col) {
    col.set('conditions', {artist: sel[0].get('name')});
    }
  }.observes('selection')

}) ;
