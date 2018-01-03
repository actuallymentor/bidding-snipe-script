# VV Bidding Chrome Extension

I don't like manually bidding on [Vakantie Veilingen](https://www.vakantieveilingen.nl), so I'll let the computer do it for me.

The folder chrome-extension can be loaded as an extension in chrome:

1. Go to chrome://extensions
2. Check the developer mode box
3. Click 'load unpacked extension'
4. Open the chrome-extension folder on your local hard drive

The extension functions as follows:

1. Go to a vakantieveilingen page
2. Click the extension icon ( default demo icon, blue globe )
3. Set your desired bid and press start
4. The extension nabivigates to the reopened auction if you lose

Notes:

- The extension asks for the bidding url, this is to make sure it only bids on one product as opposed to any open auction tabs. You still need to have a tab open with the auction of your choice