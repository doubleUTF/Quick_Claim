// Globals
var site=''

// Get and show current tab
function showTab(){
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
  var activeTab = tabs[0];
  chrome.pageAction.show(activeTab.id);
})
}

// Message listener for content_script.js
chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message=="showPage") {
       showTab()
    }
  }
)

// Message listener for popup.js
chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if(request.from=='popup') && (request.body=='getInfo'){
      sendResponse(site)
    }
  }
)

/*
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab){
  // Send a message to the active tab
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id,{"message":"clicked_browser_action"});
  })
});

// Listener for message
chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message==="open_new_tab"){
      chrome.tabs.create({"url":request.url});
    }
  }
)
*/
