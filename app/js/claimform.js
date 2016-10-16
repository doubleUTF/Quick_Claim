// On document ready
window.addEventListener('DOMContentLoaded', function(){

  // Send request to content script for tab info
  // and perform actions with active tab
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

  // Disable form by default and enable upon valid conditions
  disableForm()

  // Set input masks for date input fields
  $('.date').mask('00/00/0000',{placeholder:'__/__/____'});

  // Apply jquery validate on cpt inputs
  $('#cptForm').validate({
    rules:{
      inputProcedure:{
        number:true,
        digits:true
      }
    },
    messages:{
      inputProcedure:{
        number:"Numbers only"
      }
    },
    errorClass:'error',
    errorLabelContainer:'#cptMsg'
  })

  // jQuery Validate for Dates of Services
  $('#datesForm').validate({
    rules:{
      dateOfService:{
        dateValidate:true
      }
    },
    errorClass:'error',
    errorLabelContainer:'#dateMsg',
  })

  // Date validation is not perfect, but it's good enough
  // and I've spent enough time on it.
  jQuery.validator.addMethod('dateValidate',function(date){
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/2\d{3}$/
    if (date_regex.test(date) || date=='') {
      enableFillButton()
      return true
    }
    disableFillButton()
  }, 'Incorrect MM/DD/YYYY format')
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
  $('#statusOn').html('On: <span class="link">'+host+"</span>")
  if (result.length==0){
    $('#siteStatus').text('Current site not supported').addClass('notSupported')

  } else if (result.length==1){

    var siteObj=result[0] // Get specific siteObject from supported_sites

    switch (siteObj.name){
      case "Office_Ally_Dev":
      $('#siteStatus').text(siteObj.name+' is supported!').addClass('supported')
        chrome.tabs.sendMessage(tabs[0].id,
          {message:"getDiagnoses",siteName:siteObj.name},function(diagObj){
            if (diagObj!='{}'){
              if (getObjLength(diagObj)>4){
                $('#statusBarMsg').text('More than 4 diagnoses detected. Column 24.E will not be filled due to site limitations.').addClass('warning');
                enableForm()
                return
              }
              $('#statusBarMsg').text(getObjLength(diagObj)+' diagnosis code(s) detected, Enter CPT Codes.').addClass('supported')
              enableForm()
              $('#fillForm').on('click', function(){
                fillFormHandler(siteObj,tabs[0].id)
              })
            } else {
              $('#statusBarMsg').text('Please enter minimum one ICD-10 code into section 21.')
            }
          })
        break
      default:
        $('#siteStatus').text(siteObj.name+' is not yet supported').addClass('notSupported')
        break
    }
  }
}


// Load selectors to match Quick Claim form input into site form.
// Pass in the detected site object then get the predefined selectors
// and make use of them.

// Get number of diagnosis codes entered in native site
function getObjLength(diagObjString){
  var count=0
  diagObj=JSON.parse(diagObjString);
  for (p in diagObj){
    count+=1
  }
  return count
}

// Retrieve input data from user Quick Claim form
function getUserInput(siteObj){
  var cptValues=$('#cptForm').serializeArray();
  var datesValues=$('#datesForm').serializeArray();
  var cptObjects={}
  var datesArray=[]

  for (var i=0;i<6;i++){
    var tempObj={}
    if (cptValues[i].value){
      // Check if user input cpt is in profile saved cpt via store.js
      var cptObj=store.get('cpt'+cptValues[i].value)
      if (cptObj){
         tempObj=objectTrimmer(cptObj);
      }
      cptObjects['cpt'+cptValues[i].value]=tempObj
    }
  }
  for (var i=0;i<9;i++){
    if (datesValues[i].value){
      datesArray.push(datesValues[i].value);
    }
  }

  var rowsRequired=Object.keys(cptObjects).length*datesArray.length
  if (rowsRequired>siteObj.maxRows){
    $('#statusBarMsg').text('12 Rows limit reached. Further rows will not be added.').addClass('warning')
  }
  var claimObj={cpts:cptObjects,dates:datesArray,rows:rowsRequired}
  return claimObj
}

// Pass the data required and let content.js handle how to input data
// and if rows need to be added or subtracted since it has access
// to the actual number of rows in the site DOM.
// Will also need to pass saved cpt info.
function fillFormHandler(siteObj,tabId){
    var claimObj=getUserInput(siteObj);

    chrome.tabs.sendMessage(tabId, {
      message:"fillForm",
      siteObj:JSON.stringify(siteObj),
      claimObj:JSON.stringify(claimObj)}, null,
    function(response){
      $('#fillResponse').text(response).addClass('valid')
      console.log(response)
    })
}

// Removes empty properties from object and returns
// new object with occupied properties
// Disabling this for now, easier to work with objects with empty properties
// than to test for properties
function objectTrimmer(o){
  j={}
  for (p in o){
    if (o[p]){
      j[p]=o[p]
    }
  }
  return j
}

function disableForm(){
  $('#cptFieldSet').prop('disabled',true)
  $('#datesFieldSet').prop('disabled',true)
}

function enableForm(){
  $('#cptFieldSet').prop('disabled',false)
  $('#datesFieldSet').prop('disabled',false)
}

function getCurrentTabId(){
  chrome.tabs.query({active:true,lastFocusedWindow:true},
  function(tabs){
    if (tabs.length==1){
      return tabs[0].id
    } else throw error('Unknown tab count')
}
)}

function disableFillButton(){
  $('#fillForm').prop('disabled',true)
}

function enableFillButton(){
  $('#fillForm').prop('disabled',false)
}
