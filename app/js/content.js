// Look for entered ICD-10 diagnoses on form section 21
// and return an array of codes.

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message=='getDiagnoses'){
      sendResponse(getDiagnoses(request.siteName));
    } else if (request.message=='fillForm'){
      //console.log('Adjust Rows message received')
      fillForm(JSON.parse(request.siteObj),JSON.parse(request.claimObj))
    }
  }
)

const diagLetters=['A','B','C','D','E','F',
                   'G','H', 'I','J','K','L']

function getDiagnoses(siteName){
  var diagnosisArray={}
  switch (siteName){
    case 'Office_Ally_Dev':
      for (var i=1;i<13;i++){
        var j=i-1
        var code=$('#ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_'+i).val()
        if (code){
          diagnosisArray[diagLetters[j]]=code
          }
        }
        return JSON.stringify(diagnosisArray)
        break
    default:
    console.log('No diagnosis detected')
    break
  }
}

function fillForm(siteObj,claimObj){
  var rowsRequired=claimObj.rows
  var rowsToAdd=0
  switch (siteObj.name){
    case 'Office_Ally_Dev':
      // Only added ability to add rows since OA allows empty rows in claim.
      var tableRowsId= siteObj.selectors.prefix+siteObj.selectors.table_rows_id
      var current_rows=($('#'+tableRowsId).length)/2
      var maxRows=siteObj.maxRows
      // Disabling row checking in lieu of Office Ally having incorrect naming scheme.
      // if (rowsRequired>current_rows){
      //   rowsToAdd=rowsRequired-current_rows
      // }
      console.log('Current rows: '+ current_rows)
      console.log('Rows Required: '+ rowsRequired)
      console.log('Rows to add: ' +rowsToAdd)
      console.log('Total rows expected: '+ (rowsToAdd+current_rows))

      var addRowIntervalId= setInterval(function(){
        if (rowsToAdd<=0) {
          // Populate form once there are no further rows to be added
          populateForm(siteObj,claimObj)
          clearInterval(addRowIntervalId);
          return
        }
        rowsToAdd--
        $('#btnAddRow').click()
      },500)
      break;

    default:
      console.log('Site not supported');
      break;
  }
}

// TODO: Populate the form boy! This is the funnnn part! THIS IS IT BABY!
function populateForm(siteObj,claimObj){
  var selectAllDiag=true
  var datesArray=claimObj.dates
  var diagnosisArray=JSON.parse(getDiagnoses(siteObj.name))
  var diagnosisKeys=[]
  var row=0
  var prefix=siteObj.selectors.prefix
  var selectors=siteObj.selectors
  for (p in diagnosisArray){diagnosisKeys.push(p)}

  console.log(claimObj)
  // Begin populating rows
  switch (siteObj.name){
    case 'Office_Ally_Dev':
    // Big problem: Office Ally site does not properly increment the row number in their naming scheme.
    // From the 12th row and beyond, all row ids are equal to 11(prefix+selector+11), even if row is 39.
    // Therefore this is a problem on the site's end, not ours. Working around a broken naming scheme
    // is not a good idea. Therefore, I will only support 12 rows for now until OA fixes their shit.
    // Filling everything except diagnoses. I will allow an option for the user
    // to select all diagnosis or not.
    for (var i=0;i<claimObj.dates.length;i++){
      for (cpt in claimObj.cpts){
        $('#'+ prefix+ selectors.fromMonth + row).val(extractMonth(claimObj.dates[i]))
        $('#'+ prefix+ selectors.toMonth+row).val(extractMonth(claimObj.dates[i]))
        $('#'+ prefix+ selectors.fromDay+row).val(extractDay(claimObj.dates[i]))
        $('#'+ prefix+ selectors.toDay+row).val(extractDay(claimObj.dates[i]))
        $('#'+ prefix+ selectors.fromYear+row).val(extractYear(claimObj.dates[i]))
        $('#'+ prefix+ selectors.toYear+row).val(extractYear(claimObj.dates[i]))
        $('#'+ prefix+ selectors.placeOfService+row).val(claimObj.cpts[cpt].place)
        $('#'+ prefix+ selectors.emg+row).val(claimObj.cpts[cpt].emg)
        $('#'+ prefix+ selectors.cpt+row).val(extractCpt(cpt))
        $('#'+ prefix+ selectors.modA+row).val(claimObj.cpts[cpt].modA)
        $('#'+ prefix+ selectors.modB+row).val(claimObj.cpts[cpt].modB)
        $('#'+ prefix+ selectors.modC+row).val(claimObj.cpts[cpt].modC)
        $('#'+ prefix+ selectors.modD+row).val(claimObj.cpts[cpt].modD)
        $('#'+ prefix+ selectors.charges+row).val(claimObj.cpts[cpt].charge)
        $('#'+ prefix+ selectors.units+row).val(claimObj.cpts[cpt].days)
        $('#'+ prefix+ selectors.epsdt+row).val(claimObj.cpts[cpt].epsdt)
        if (selectAllDiag && diagnosisKeys.length<5) {
          $('#'+ prefix+ selectors.diagnosis+row).val(diagnosisKeys.join(''))
        }
        row++
        }
      }
    break
    default:
    break
  }
}

// Regex helper functions
function extractMonth(date){
  var month_regex=/^(0[1-9]|1[0-2])/
  return month_regex.exec(date)[1]
}

function extractDay(date){
  var day_regex=/\/([0-9]{2})\//
  return day_regex.exec(date)[1]
}

function extractYear(date){
  var year_regex=/\/([0-9]{4})/
  return year_regex.exec(date)[1]
}

function extractCpt(cptName){
  var cpt_regex=/(\d+)/
  return cpt_regex.exec(cptName)[1]
}
