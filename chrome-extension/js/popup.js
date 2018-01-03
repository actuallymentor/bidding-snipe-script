console.log ( "Popup js loaded" )

const id = theid => document.getElementById( theid )
const set = ( theid, value ) => id( theid ).nodeName == 'INPUT' ? ( id( theid ).value = value ) : ( id( theid ).innerHTML = value )
const click = ( theid, callback ) => id( theid ).addEventListener( 'click', callback )
const listen = ( type, theid, callback ) => id( theid ).addEventListener( type, callback )

const menu = { 
  bid: { display: 'bid', input: 'bidin' },
  status: {
    id: 'status'
  },
  url: { 
    input: 'bidurl',
    display: 'urldisplay'
  },
  storage: { 
    bid: 'vv_bid',
    status: 'vv_bidding',
    def: { 
      vv_bid: 0,
      vv_bidding: false,
      vv_url: false
    }
  }
}

const updateInterface = f => { 
  // Initialise the interface
  chrome.storage.sync.get( menu.storage.def , item => {
    // Set the bidding status based on the stored status
    item.vv_bidding ? set( menu.status.id, 'active' ) : set( menu.status.id, 'inactive' )
    // Set the interface bid based on the stored bid
    set( menu.bid.input, item.vv_bid ?  item.vv_bid : 'not set' )
    set( menu.bid.display, item.vv_bid ?  item.vv_bid : 'not set' )

    set( menu.url.input, item.vv_url ? item.vv_url : 'not set' )
    set( menu.url.display, item.vv_url ? item.vv_url : 'not set' )

  } )
}

const processInputs = ( biddingstatus, callback ) => { 
  let values = { 
    vv_bidding: biddingstatus,
    vv_bid: id( menu.bid.input ).value ? id( menu.bid.input ).value : 0,
    vv_url: id( menu.url.input ).value ? id( menu.url.input ).value : false
   }
  chrome.storage.sync.set( values, callback )
}

window.onload = updateInterface


// Activation button logic
click( 'activate', f => { 
  // Set the storage to active and store the bidding amount
  processInputs( true, updateInterface )
} )

// Deactivatio logic
click( 'deactivate', f => { 
  // Set the bidding status to inactive and show it in the interface
  processInputs( false, updateInterface )
  // chrome.storage.sync.set( { vv_bidding: false }, item => set( menu.status.id, 'inactive' ) )
} )

// Change logic
listen('keyup', menu.url.input, e => chrome.storage.sync.set( { 'vv_url': e.target.value }, updateInterface ) )
listen('keyup', menu.bid.input, e => chrome.storage.sync.set( { 'vv_bid': e.target.value }, updateInterface ) )

listen('change', menu.url.input, e => chrome.storage.sync.set( { 'vv_url': e.target.value }, updateInterface ) )
listen('change', menu.bid.input, e => chrome.storage.sync.set( { 'vv_bid': e.target.value }, updateInterface ) )