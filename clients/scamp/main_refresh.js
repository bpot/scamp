Scamp._refreshStuff = function() {
    Scamp.server.listFor({
      recordType: Scamp.Playlist});
    Scamp.server.listFor({
      recordType: Scamp.Status,
      callback: function() {
        Scamp.statusController.set('content', Scamp.Status.find(1));
      }
    });
    
    Scamp.server.listFor({
      recordType: Scamp.Artist});

    Scamp.server.listFor({
      recordType: Scamp.Album});
}
