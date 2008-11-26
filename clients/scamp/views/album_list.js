// ==========================================================================
// Scamp.AlbumListView
// ==========================================================================

require('core');

/** @class

  (Document Your View Here)

  @extends SC.View
  @author AuthorName
  @version 0.1
*/
Scamp.AlbumListView = SC.ListView.extend(
/** @scope Scamp.AlbumListView.prototype */ {

  // TODO: Add your own code here.
  doubleClick: function(ev) {
    var view = this.itemViewForEvent(ev);
    var content = this.get('selection');
    if(view && content) {
      Scamp.playlistController.addAlbum(content);
    }
  }

}) ;
