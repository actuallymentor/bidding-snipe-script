const id 		= theid => document.getElementById( theid )
const byclass 	= theclass => document.getElementsByClassName( theclass )
const set 		= ( theid, value ) => id( theid ).innerHTML = value
const select 	= query => document.querySelectorAll( query )
const click 	= ( theid, callback ) => id( theid ).addEventListener( 'click', callback )

const debug = true

if( debug ) console.log( 'Sniping script for Vakantieveilingen loaded' )

class Sniper {

	constructor( ) {

		// Grab relevant DOM elements
		this.input 		= id( 'jsActiveBidInput' )
		this.submit 	= id( 'jsActiveBidButton' )
		this.countdown  = byclass( 'timer-countdown-label' )[0] // Grag the first hit since it shold be the only one
		this.results 	= byclass( 'resultsBlockTitle' )[0]

		// Get the current time as an array
		// Object.defineProperty( this, 'time', { 
		// 	get: f => Array.prototype.map.call( select( '.bidding-block-wrap .time-value' ), timebit => timebit.textContent.replace( ':', '' ) )
		// } )

		// Is this the 2nd last second?
		Object.defineProperty( this, 'gogogo', { 
			get: f => this.countdown ? ( Number( this.countdown.innerHTML ) < 3 ? true : false ) : false
		} )

		// Has this auction ended? Based on the availablity of the time array
		Object.defineProperty( this, 'ended', { 
			get: f => this.results ? true : false	
		} )
	}

	// Set the price
	setprice( price ) { price ? ( this.price = price ) : ( this.price = 0 ) }

	// Activate or deactivate
	setactive( status ) {  typeof status == 'boolean' ? ( this.active = status ) : ( this.active = false ) }

	// Set the url the extension is authorised to bid on
	seturl( url ) { url ? ( this.url = url ) : ( this.url = false ) }

	// Is the input box available? Set a sniper action at a periodic interval, otherwise console a message
	start( ) { this.input ? setInterval( f => this.shoot(  ), 1000 ) : console.log( 'Sniper: Not a bidding page, or not logged in' ) }

	// Reload the auction based on the button in the GUI
	reload( ) { 
		const reloadbtn = select( '#jsBiddingContainer a.pay-your-auction' )[0]
		const ready 	= reloadbtn ? ( reloadbtn.textContent.indexOf('heropende') != -1 ? true : false ) : false
		if( ready ) reloadbtn.click()
	}

	// Set the input box, if the time is right bid, if the auction passed reload
	shoot( ) {

		// Reload if the auction has ended
		if( this.ended ) return this.reload()		

		// Return a message if we are not activated or on the wrong page
		if( !this.active || this.url != window.location.href ) return debug ? console.log( 'Sniper not active' ) : false
		if( this.active && debug ) console.log( 'Sniper active' )

		// Set price and bid
		if( this.gogogo && !this.ended ) { 
			this.input.value = this.price
			this.submit.click( )
		}
		
	}

	// Report current values
	report( changes ) { 
		console.log( 'New directives received', changes )
		console.log( 'New status', { status: this.active, bid: this.price } )
	 }

}



// Start the sniper when the page is ready
window.onload = f => { 

	// Generate a sniper
	const sniper = new Sniper( )

	chrome.storage.sync.get( [ 'vv_bid', 'vv_bidding', 'vv_url' ], data => { 
		if( debug ) console.log( data )
		sniper.setprice( data.vv_bid )
		sniper.setactive( data.vv_bidding )
		sniper.seturl( data.vv_url )
		sniper.start( )
	} )

	chrome.storage.onChanged.addListener( ( changes, namespace ) => {
		if( debug ) console.log( 'Change detected', changes )
		if( changes.vv_bid ) sniper.setprice( changes.vv_bid.newValue )
		if( changes.vv_bidding ) sniper.setactive( changes.vv_bidding.newValue )
		if( changes.vv_url ) sniper.seturl( changes.vv_url )
		if( debug ) sniper.report( changes )
	 } )
	
 }