const id = theid => document.getElementById( theid )
const set = ( theid, value ) => id( theid ).innerHTML = value
const click = ( theid, callback ) => id( theid ).addEventListener( 'click', callback )

console.log( 'Sniping script for Vakantieveilingen loaded' )

const snipe = f => { 
	
}