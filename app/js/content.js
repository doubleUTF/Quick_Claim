$(function(){
  var currentTab={active:true, currentWindow:true};
  chrome.tabs.query(currentTab,function(tabs){
    var tab=tabs[0];
    var tabString=tab.toString()
    var tabJSON=JSON.stringify(tabString)
    console.log(tabJSON)
    chrome.runtime.sendMessage({
      header:"tabInfo",
      body:tabJSON
    })
  })
})
