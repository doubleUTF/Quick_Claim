// On document ready
window.addEventListener('DOMContentLoaded', function(){

  // Send request to content script for tab info
  chrome.tabs.query({active:true,lastFocusedWindow:true},
  function(tabs){
      if (tabs.length==1){
        var url=tabs[0].url;
        renderStatus(url,tabs);
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

  // Disable form by default and enable only when
  // valid conditions have been met
  $('#claimForm').prop('disabled',true)

  // Set input masks for date input fields
  $('.date').mask('00/00/0000',{placeholder:'__/__/____'});
}) //End of document ready


////////////// Helper functions

// Check to see if current url in tab is supported
// against list of supported sites. Then render status
// as accordingly.
function renderStatus(url,tabs){
  var host = url.match(/^(.*?:\/{2,3})?(.+?)(\/|$)/)[2];
  var result=$.grep(supported_sites,function(elem){
    return (elem.url===host);
  })
  if (result.length==0){
    $('#statusOn').html('On: <span class="link">'+host+"</span>")
    $('#statusBarMsg').text('Current site not supported').addClass('notSupported')

  } else if (result.length==1){
    $('#statusOn').html('On: <span class="link">'+host+"</span>")
    var siteObj=result[0]

    switch (siteObj.name){
      case "Office_Ally_Dev":
        chrome.tabs.sendMessage(tabs[0].id,
          {message:"getDiagnoses",site:siteObj.name},function(diagObj){
            if (diagObj!='{}'){
              if (getObjLength(diagObj)>4){
                $('#statusBarMsg').text('More than 4 diagnoses detected. Column 24.E will not be filled due to site limitations.').addClass('warning');
                $('#claimForm').prop('disabled',false);
                return
              }
              $('#statusBarMsg').text(getObjLength(diagObj)+' diagnosis code(s) detected, Enter CPT Codes.').addClass('supported')
              $('#claimForm').prop('disabled',false);
            } else{
              $('#statusBarMsg').text(siteObj.name+' is supported! Please enter minimum one ICD-10 code into section 21.').addClass('supported')
            }
          })
        break
      default:
        $('#statusBarMsg').text(siteObj.name+' is not yet supported').addClass('notSupported')
        break
    }
  }
}


// Load selectors to match Quick Claim form input into site form.
// Pass in the detected site object then get the predefined selectors
// and make use of them.

function getObjLength(diagObjString){
  var count=0
  diagObj=JSON.parse(diagObjString);
  for (p in diagObj){
    count+=1
  }
  return count
}


function loadSelectors(siteObj){
}
