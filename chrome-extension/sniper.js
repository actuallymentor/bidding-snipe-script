console.log ( "Sniper initiated" ); 

function startbidding ( biddingspeed ) { // Bidding speed is in milliseconds
	window.setInterval(function(){
		if  ( jqloaded )  {

			// Create needed variables
			var myname = "Mentor"; // Set my name
			var nowbid = jQuery('#jsMainLotCurrentBid').text(); // Get the current bid
			var highestBidder = jQuery('#highestBidder').text(); // Get the current highest bidder
			var timeleft = jQuery ( '.time-value.minutes' ).text (  ); // Get the time left, but only the minutes, not the seconds
			var timeleft_sec = jQuery ( '.time-value.seconds' ).text (  ); // Get the time left, ins econds
			var worthtome = 12; // Set the max price I'm willing to pay

			// Update the time we have left
			timeleft = jQuery ( '.time-value.minutes' ).text (  );
			// Check if the bidding is in the last minute
			if  ( timeleft !== 0 ) {
				// Check if the seconds are zero, what would mean the bidding is done
				if  ( timeleft_sec == 0 ) {
					// Log that bidding is closed
					console.log ( "Bidding is closed, reloading." );
					location.reload();
				} else {
					// Log that we are bidding
					console.log ( 'We are in the last minute, Im planning to bid' ); 
					// Update the current time
					nowbid = Number  ( jQuery('#jsMainLotCurrentBid').text() ) ;
					// Get out the current winning name
					highestBidder = jQuery('#highestBidder').text();
					if  ( nowbid < worthtome &&  !( highestBidder.indexOf(myname) != -1 )  ) {
						nowbid = nowbid + 1;
						jQuery ( '#jsActiveBidInput' ).val ( nowbid ); 
						jQuery ( '#jsActiveBidButton' ).trigger ( "click" );
						console.log ( 'Bid against ' + highestBidder + ', I bid ' + nowbid ); 
					} else {
						if  ( !( highestBidder == myname )  ) {
							console.log ( "Not bidding because we hold the highest bid" ); 
						}
						if  ( nowbid > worthtome ) {
							console.log ( "Not bidding because the bid is higher than out max" ); 
						}
					}
				}
			} else {
				// Log that we are not bidding yet
				console.log ( 'Too much time left, not bidding' ); 
			}
		}
	}, biddingspeed * 1000);
}

console.log ( "Function defined" ) ;

startbidding ( 10 ); 
console.log ( "Function started" ); 
