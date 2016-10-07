window.addEventListener('DOMContentLoaded',function(e){
  alert('bullshit')
  console.log("DOM fully loaded and parsed");
  var currentTab={active:true, currentWindow:true};
  alert(currentTab);
  alert('bullshit');

  chrome.tabs.query(currentTab, function(tabs){
    alert(tabs)
    console.log(tabs)
    chrome.tabs.sendMessage(tabs[0].id,
        {
        header:"tabInfo",
        body:"bullshit"
      })
    })
})

window.addEventListener('DOMContentLoaded',function(e){
  console.log("DOM fully loaded and parsed")
  alert("DOM fully loaded and parsed")
})

console.log('TEST')
