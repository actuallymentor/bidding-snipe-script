var jq = document.createElement('script');
jq.src = "//code.jquery.com/jquery-latest.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
var jqloaded = false;

var isjq =  document.getElementsByTagName("head");
jq.onload = function() {
	jQuery.noConflict();
	console.log ( 'jQ loaded' );
	jqloaded = true;

};

var biddingspeed = 5000; // Bid every how many milliseconds

window.setInterval(function(){

	if  ( jqloaded )  {
	// Create needed variables
	var myname = "Mentor Palokaj"; // Set my name
	var nowbid = jQuery('#jsMainLotCurrentBid').text(); // Get the current bid
	var imwinning = jQuery('#highestBidder').text(); // Get the current highest bidder
	var timeleft = jQuery ( '.time-value.minutes' ).text (  ); // Get the time left, but only the minutes, not the seconds
	var worthtome = 16; // Set the max price I'm willing to pay

	// Update the time we have left
	timeleft = jQuery ( '.time-value.minutes' ).text (  );

	// Check if the bidding is in the last minute
	if  ( timeleft !== 0 ) {

		// Log that we are bidding
		console.log ( 'We are in the last minute, Im planning to bid' ); 

		// Update the current time
		nowbid = Number  ( jQuery('#jsMainLotCurrentBid').text() ) ;

		// Get out the current winning name
		imwinning = jQuery('#highestBidder').text();


		if  ( nowbid < worthtome &&  !( imwinning == myname )  ) {
			nowbid = nowbid + 1;
			jQuery ( '#jsActiveBidInput' ).val ( nowbid ); 
			jQuery ( '#jsActiveBidButton' ).trigger ( "click" );
			console.log ( 'Bidding succeeded, I bid ' + nowbid ); 
		} else {
			if  ( !( imwinning == myname )  ) {
				console.log ( "Not bidding because we hold the highest bid" ); 
			}
			if  ( nowbid > worthtome ) {
				console.log ( "Not bidding because the bid is higher than out max" ); 
			} 
		}
	} else {
		// Log that we are not bidding yet
		console.log ( 'Too much time left, not bidding' ); 
	}
}
}, biddingspeed);
