// Listen for tabinfo request from claimform.js
chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
    if (request.message=='getTabInfo'){
      sendResponse({
        message:"dummy tab info"
      });
    }
  }
)
