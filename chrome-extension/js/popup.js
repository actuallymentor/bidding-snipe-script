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
    status: 'vv_status',
    def: { 
      vv_bid: 0,
      vv_bidding: false
    }
  }
}

chrome.storage.sync.get( menu.storage.def , item => {
  item[ 'vv_bidding' ] ? set( menu.bid.display, 'active' ) : set( menu.status.id, 'inactive' )
  set( menu.bid.display, item[ 'vv_bid' ] ?  item[ 'vv_bid' ] : 'not set' )
} )

click( 'activate', f => { 
  console.log( 'Started bidding' )
  chrome.storage.sync.set( { vv_bidding: true, vv_bid: id( menu.bid.input ).value }, f => { 
    set( menu.status.id, 'active' )
    chrome.storage.sync.get( menu.storage.bid, item => set( menu.bid.display, item[ 'vv_bid' ] ) )
  } )
} )

click( 'deactivate', f => { 
  chrome.storage.sync.set( { vv_bidding: false }, item => set( menu.status.id, 'inactive' ) )
} )