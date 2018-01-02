const id 		= theid => document.getElementById( theid )
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

		// Get the current time as an array
		Object.defineProperty( this, 'time', { 
			get: f => Array.prototype.map.call( select( '.bidding-block-wrap .time-value' ), timebit => timebit.textContent.replace( ':', '' ) )
		} )

		// Is this the 2nd last second?
		Object.defineProperty( this, 'gogogo', { 
			get: f => this.time[0] == '00' && this.time[1] == '00'  && this.time[2] < '02' ? true : false
		} )

		// Has this auction ended? Based on the availablity of the time array
		Object.defineProperty( this, 'ended', { 
			get: f => this.time[0] ? false : true	
		} )
	}

	// Set the price
	setprice( price ) { price ? ( this.price = price ) : ( this.price = 0 ) }

	// Activate or deactivate
	setactive( status ) {  typeof status == 'boolean' ? ( this.active = status ) : ( this.active = false ) }

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

		// Return a message if we are not activated
		if( !this.active ) return debug ? console.log( 'Sniper not active' ) : false
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

	chrome.storage.sync.get( [ 'vv_bid', 'vv_bidding' ], data => { 
		if( debug ) console.log( data )
		sniper.setprice( data.vv_bid )
		sniper.setactive( data.vv_bidding )
		sniper.start( )
	} )

	chrome.storage.onChanged.addListener( ( changes, namespace ) => {
		if( debug ) console.log( 'Change detected', changes )
		if( changes.vv_bid ) sniper.setprice( changes.vv_bid.newValue )
		if( changes.vv_bidding ) sniper.setactive( changes.vv_bidding.newValue )
		if( debug ) sniper.report( changes )
	 } )
	
 }