console.log ( "Popup js loaded" )

const id = theid => document.getElementById( theid )
const set = ( theid, value ) => id( theid ).innerHTML = value
const click = ( theid, callback ) => id( theid ).addEventListener( 'click', callback )

const menu = { 
  bid: { display: 'bid', input: 'bidin' },
  status: {
    id: 'status'
  },
  storage: { 
    bid: 'vv_bid',
    status: 'vv_bidding',
    def: { 
      vv_bid: 0,
      vv_bidding: false
    }
  }
}

// Initialise the interface
chrome.storage.sync.get( menu.storage.def , item => {
  // Set the bidding status based on the stored status
  item[ 'vv_bidding' ] ? set( menu.status.id, 'active' ) : set( menu.status.id, 'inactive' )
  // Set the interface bid based on the stored bid
  set( menu.bid.display, item[ 'vv_bid' ] ?  item[ 'vv_bid' ] : 'not set' )
  id( menu.bid.input ).value = item[ 'vv_bid' ]

} )


// Activation button logic
click( 'activate', f => { 
  // Set the storage to active and store the bidding amount
  chrome.storage.sync.set( { vv_bidding: true, vv_bid: id( menu.bid.input ).value ? id( menu.bid.input ).value : 0 }, f => { 
    // Show interface as active
    set( menu.status.id, 'active' )
    // Get the stored bid and display it
    chrome.storage.sync.get( menu.storage.bid, item => set( menu.bid.display, item[ 'vv_bid' ] ) )
  } )
} )

// Deactivatio logic
click( 'deactivate', f => { 
  // Set the bidding status to inactive and show it in the interface
  chrome.storage.sync.set( { vv_bidding: false }, item => set( menu.status.id, 'inactive' ) )
} )