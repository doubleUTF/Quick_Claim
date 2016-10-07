// On document ready
window.addEventListener('DOMContentLoaded', function(){

  // Send request to content script for tab info
  chrome.tabs.query({active:true,currentWindow:true},
  function(tabs){chrome.tabs.sendMessage(tabs[0].id,
    {message:'getTabInfo'},function(response){
      $('#statusOn').text(response.message);
      console.log(tabs[0]);
    }
  )})

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
