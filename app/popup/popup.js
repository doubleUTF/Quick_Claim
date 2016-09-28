// On document ready
window.addEventListener('DOMContentLoaded', function(){

// Declare globals
const OA=12

  // Get tabs
  queryTabs('dev')

  // Check the keycode from event, if it's a letter
  // or word, autotab. Else, do not autotab.
  $('.autoinput').keyup(function(event){
    var a=(event.keyCode)
    var c= String.fromCharCode(event.keyCode);
    var isWordcharacter= c.match(/\w/);
    var inputId=this.id;
    var inputNum=this.id[inputId.length-1];
    var next=inputId.substring(0,inputId.length-1)+(parseInt(inputNum)+1)

    if (((isWordcharacter) || (c=='`')) && (this.value.length==this.maxLength)){
      $('#'+next).focus();
    }
  })
})


// Helper functions

// Get tabs, type 'dev' for development purposes
function queryTabs(mode){
  if (mode=='dev'){
    return
  } else {
      // Retrieve site name from content.js and updateDom
    chrome.tabs.query({
      active:true,
      currentWindow:true
    }, function(tabs){
      chrome.tabs.sendMessage(
        tabs[0].id,
        {'from':'popup','body':'getInfo'},
        updateDom);
    })
  }
}

// Update popup DOM
function updateDom(info){
  $('#site').append(info);
}
