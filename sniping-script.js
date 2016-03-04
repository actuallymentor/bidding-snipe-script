var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

jQuery.noConflict();

// Create needed variables
var myname = "Mentor Palokaj"; // Set my name
var nowbid = jQuery('#jsMainLotCurrentBid').text(); // Get the current bid
var imwinning = jQuery('#highestBidder').text(); // Get the current highest bidder
var timeleft = jQuery ( '.time-value.minutes' ).text (  ); // Get the time left, but only the minutes, not the seconds
var worthtome = 20; // Set the max price I'm willing to pay
var biddingspeed = 5000; // Bid every how many milliseconds?

window.setInterval(function(){

	// Update the time we have left
	timeleft = jQuery ( '.time-value.minutes' ).text (  );

	// Check if the bidding is in the last minute
	if  ( timeleft == 0 ) {

		// Log that we are bidding
		console.log ( 'We are in the last minute, Im bidding' ); 

		// Update the current time
		nowbid = jQuery('#jsMainLotCurrentBid').text();

		// Get out the current winning name
		imwinning = jQuery('#highestBidder').text();


		if  ( nowbid < worthtome &&  !( imwinning == myname )  ) {
			nowbid = nowbid + 1;
			jQuery ( '#jsActiveBidInput' ).val ( nowbid ); 
			jQuery ( '#jsActiveBidButton' ).trigger ( "click" );
			console.log ( 'Bidding succeeded, I bid ' + nowbid ); 
		}
	} else {
		// Log that we are not bidding yet
		console.log ( 'Too much time left, not bidding' ); 
	}
}, 5000);