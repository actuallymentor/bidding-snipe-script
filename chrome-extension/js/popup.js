console.log ( "Popup js loaded" );
chrome.storage.sync.get({
  vv_bidding: false,
  vv_worth: 0
}, function(item) {
  if  ( item['vv_bidding'] ) {
    document.getElementById('status').innerHTML = 'active - ' + item['vv_worth'];
  } else if ( !item['vv_bidding'] ) {
    document.getElementById('status').innerHTML = 'inactive - ' + item['vv_worth'];
  }
});


document.getElementById('activate').addEventListener("click", function (  ) {
  console.log ( "Activate bidder" );
  chrome.storage.sync.set({
    vv_bidding: true,
    vv_worth: document.getElementById('worth').value
  }, function(item) {
    console.log ( "Set bidding on and value" );
    document.getElementById('status').innerHTML = 'active - ' + item['vv_worth'];
  });
} 
);

document.getElementById('deactivate').addEventListener("click", function (  ) {
  console.log ( "Deactivating bidder" ); 
  chrome.storage.sync.set({
    vv_bidding: false
  }, function(item) {
    console.log ( "Set bidding to true" );
    document.getElementById('status').innerHTML = 'inactive - ' + item['vv_worth'];
  });
} 
);