// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.storage.local.clear( function() {
    console.log('Wiped local data ');
  });

  
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });



  // chrome.tabs.executeScript({
  //   code: 'var div=document.createElement("div"); document.body.appendChild(div); div.innerText="test123";'
  // });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      // THIS SECTION DOES NOT APPEAR TO FUNCTION
      // chrome.tabs.create({"url": request.url});
      // console.log("click request", request.url);
      // chrome.storage.local.clear( function() {
      //   console.log('Wiped local data ');
      // });
    }
  }
);


// chrome.storage.onChanged.addListener(function(changes, namespace) {
//         for (var key in changes) {
//           var storageChange = changes[key];
//           console.log('Storage key "%s" in namespace "%s" changed. ' +
//                       'Old value was "%s", new value is "%s".',
//                       key,
//                       namespace,
//                       storageChange.oldValue,
//                       storageChange.newValue);
//         }
//       });