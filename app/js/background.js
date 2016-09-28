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
       //console.log('tab message received')
       showTab()
    }
  }
)
