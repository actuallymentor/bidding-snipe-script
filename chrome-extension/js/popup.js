console.log ( "Popup js loaded" ); 
function saveChanges() {
  // Get a values of the popup
  var vv_worth = document.getElementById('worth').value;
  var vv_page = document.getElementById('bidpage').value;

  // Check that there's some code there.
  if ( !( vv_worth ) ||  !( vv_page )  ) {
    message('Error: Not all values specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'vv_worth': vv_worth}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'vv_page': vv_page}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

document.getElementById('activate').addEventListener("click", function (  ) {
  console.log ( "You clicked the button! Well done." ); 
  chrome.storage.sync.set({
    vv_bidding: true
  }, function(item) {
    console.log ( "Set bigging to true" ); 
  });
} 
);