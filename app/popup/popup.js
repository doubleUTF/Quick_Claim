// Update popup DOM
function updateDom(info){
}

// On document ready,
/*
$(document).ready(function(){
  chrome.tabs.query({
    active:true,
    currentWindow:true
  }, function(tabs){
    chrome.runtime.sendMessage(
      tabs[0].id,
      {'from':'popup','body':'getInfo'},
  function(response){
    console.log(response)
  })
  })
})
*/

document.addEventListener('DOMContentLoaded',function(){
  chrome.tabs.query({
    active:true,
    currentWindow:true
  }, function(tabs){
    chrome.tabs.sendMessage(
      tabs[0].id,
      {from:'popup',body:'getInfo'},
  function(response){
    console.log(response)
  })
  })
})
