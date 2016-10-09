// On document ready
window.addEventListener('DOMContentLoaded', function(){

  // Send request to content script for tab info
  chrome.tabs.query({active:true,lastFocusedWindow:true},
  function(tabs){
      if (tabs.length==1){
        var url=tabs[0].url;
        renderStatus(url);
        chrome.tabs.sendMessage(tabs[0].id,
          {message:"getDiagnoses"},function(response){
            console.log(response)
          })
      } else{
        throw new Error('Unexpected tab count')
      }
    }
  )

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

// Check to see if current url in tab is supported
// against list of supported sites. Then render status
// as accordingly.
function renderStatus(url){
  var host = url.match(/^(.*?:\/{2,3})?(.+?)(\/|$)/)[2];
  var result=$.grep(supported_sites,function(elem){
    return (elem.url===host);
  })
  if (result.length==0){
    $('#statusOn').html('On: <span class="link">'+host+"</span>")
    $('#statusBarMsg').text('Current site not supported').addClass('notSupported')
    $('#claimForm').prop('disabled',true)

  } else if (result.length==1){
    $('#statusOn').html('On: <span class="link">'+host+"</span>")
    var siteObj=result[0]
    if (siteObj.supported){
        $('#statusBarMsg').text(siteObj.name+' is supported!').addClass('supported')
    } else{
      $('#statusBarMsg').text(siteObj.name+' is not yet supported').addClass('notSupported')
      $('#claimForm').prop('disabled')
    }
  }
}


// Load selectors to match Quick Claim form input into site form.
// Pass in the detected site object then get the predefined selectors
// and make use of them.
function loadSelectors(siteObj){

}
