Scamp._refreshStuff = function() {
  Scamp._refreshStatusTimer.set('isPaused', YES) ;
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
  Scamp._refreshStatusTimer.set('isPaused', NO) ;
}

Scamp._refreshStatus = function() {
    Scamp.server.listFor({
      recordType: Scamp.Status,
      callback: function() {
        Scamp.statusController.set('content', Scamp.Status.find(1));
      }
    });
}
