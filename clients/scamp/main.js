// ==========================================================================
// Scamp
// ==========================================================================

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
function main() {

  // Step 1: Load Your Model Data
  // The default code here will load the fixtures you have defined.
  // Comment out the preload line and add something to refresh from the server
  // when you are ready to pull data from your server.
//  Scamp.server.preload(Scamp.FIXTURES) ;
  //Scamp.server.listFor({recordType: Scamp.Status})
  // TODO: refresh() any collections you have created to get their records.
  // ex: Scamp.contacts.refresh() ;

  // Step 2: Instantiate Your Views
  // The default code just activates all the views you have on the page. If
  // your app gets any level of complexity, you should just get the views you
  // need to show the app in the first place, to speed things up.
  SC.page.awake() ;

  // Step 3. Set the content property on your primary controller.
  // This will make your app come alive!
    var col = Scamp.Playlist.collection();
    Scamp.playlistController.set('content', col);
    col.set('orderBy', 'pos ASC');
    Scamp.server.listFor({
      recordType: Scamp.Playlist});

    var col = Scamp.Artist.collection();
    Scamp.artistController.set('content', col);
    Scamp.server.listFor({
      recordType: Scamp.Artist});

    var col = Scamp.Album.collection();
    Scamp.albumController.set('content', col);
    Scamp.server.listFor({
      recordType: Scamp.Album});

    Scamp._refreshStatusTimer = SC.Timer.schedule({
      action: 'Scamp._refreshStatus',
      //interval: 60000,
      interval: 1000000,
      repeats: YES
      });

    Scamp.server.listFor({
      recordType: Scamp.Status,
      callback: function() {
        Scamp.statusController.set('content', Scamp.Status.find(1));
      }
    });

    Scamp._refreshTimer = SC.Timer.schedule({
      action: 'Scamp._refreshStuff',
      //interval: 60000,
      interval: 10000,
      repeats: YES
   });


    //col.dataSource = Scamp.server;
    //col.refresh();
    /*
    Scamp.server.listFor({
      recordType: Scamp.Playlist,
      callback: function() {
        Scamp.statusController.set('content', );
      }
    });*/
   // Scamp.statusController.set('content', col);
  // col.refresh(); 
  //Scamp.statusController.set('content', col);
  //col.refresh();

} ;
