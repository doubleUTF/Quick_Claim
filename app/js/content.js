// Look for entered ICD-10 diagnoses on form section 21
// and return an array of codes.

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message=='getDiagnoses'){
      sendResponse(getDiagnoses(request.siteName));
    } else if (request.message=='fillForm'){
    fillForm(JSON.parse(request.siteObj),JSON.parse(request.claimObj),
      function(response){sendResponse(response)})
    return true
  } else if (request.message=='undoForm'){
    sendResponse(undoForm(JSON.parse(request.siteObj)))
  }
  }
)

const diagLetters=['A','B','C','D','E','F',
                   'G','H', 'I','J','K','L']

function getDiagnoses(siteName){
  var diagnosisArray={}
  switch (siteName){
    case 'Office Ally Demo':
      for (var i=1;i<13;i++){
        var j=i-1
        var code=$('#ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_'+i).val()
        if (code){
          diagnosisArray[diagLetters[j]]=code
          }
        }
        return JSON.stringify(diagnosisArray)

    case 'OA-Actual':
    case 'Office Ally':
        var iframe=$('#Iframe9').contents()
        for (var i=1;i<13;i++){
          var j=i-1
          var code=iframe.find('#ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_'+i).val()
          if (code){
            diagnosisArray[diagLetters[j]]=code
          }
        }
      return JSON.stringify(diagnosisArray)

    default:
      console.log('No diagnosis detected')
      break
  }
}

function fillForm(siteObj,claimObj,callback){
  var rowsRequired=claimObj.rows
  var rowsToAdd=0
  switch (siteObj.name){
    case 'Office Ally':
    case 'OA-Actual':
    case 'Office Ally Demo':
      // Only added ability to add rows since OA allows empty rows in claim.
      var iframe=$('#IFrame9').contents()
      var tableRowsId= siteObj.selectors.prefix+siteObj.selectors.table_rows_id
      var maxRows=siteObj.maxRows
      if (maxRows<rowsRequired){
        callback('Error, '+rowsRequired+ ' rows required but only '+ maxRows+ ' allowed.')
        return
      }
      // Disabling row checking in lieu of Office Ally having incorrect naming scheme.
      // if (siteObj.name=='OA-Actual'|| siteObj.name=='Office Ally'){
      //   var current_rows=(iframe.find('#'+tableRowsId).length)/2
      // } else{var current_rows=($('#'+tableRowsId).length)/2}
      // if (rowsRequired>current_rows){
      //   rowsToAdd=rowsRequired-current_rows
      // }
      // console.log('Current rows: '+ current_rows)
      // console.log('Rows Required: '+ rowsRequired)
      // console.log('Rows to add: ' +rowsToAdd)
      // console.log('Total rows expected: '+ (rowsToAdd+current_rows))

      var addRowIntervalId= setInterval(function(){
        if (rowsToAdd<=0) {
          // Populate form once there are no further rows to be added
          callback(populateForm(siteObj,claimObj))
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

// Meat of the app. Fill those rows up baby!
function populateForm(siteObj,claimObj){
  var selectAllDiag=true
  var datesArray=claimObj.dates
  var diagnosisArray=JSON.parse(getDiagnoses(siteObj.name))
  var diagnosisKeys=[]
  var row=0
  var prefix=siteObj.selectors.prefix
  var selectors=siteObj.selectors
  for (p in diagnosisArray){diagnosisKeys.push(p)}

  // Begin populating rows
  switch (siteObj.name){
    case 'Office Ally Demo':
      // Big problem: Office Ally site does not properly increment the row number in their naming scheme.
      // From the 12th row and beyond, all row ids are equal to 11(prefix+selector+11), even if row is 39.
      // Therefore this is a problem on the site's end, not ours. Working around a broken naming scheme
      // is not a good idea. Therefore, I will only support 12 rows for now until OA fixes their shit.
      // Filling everything except diagnoses. I will allow an option for the user
      // to select all diagnosis or not.
      for (var i=0;i<claimObj.dates.length;i++){
        if (!extractMonth(claimObj.dates[i]) ||
            !extractDay(claimObj.dates[i])  ||
            !extractYear(claimObj.dates[i])){
          return ('Invalid date: '+ claimObj.dates[i])
        }
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
      if (row>0) return ('Success! ' + (row) + ' row(s) filled.')
      return

    case 'OA-Actual':
    case 'Office Ally':
    var iframe=$('#Iframe9').contents()
      for (var i=0;i<claimObj.dates.length;i++){
        if (!extractMonth(claimObj.dates[i]) ||
            !extractDay(claimObj.dates[i])  ||
            !extractYear(claimObj.dates[i])){
          return ('Invalid date: '+ claimObj.dates[i])
        }
        for (cpt in claimObj.cpts){
          iframe.find('#'+ prefix+ selectors.fromMonth + row).val(extractMonth(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.toMonth+row).val(extractMonth(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.fromDay+row).val(extractDay(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.toDay+row).val(extractDay(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.fromYear+row).val(extractYear(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.toYear+row).val(extractYear(claimObj.dates[i]))
          iframe.find('#'+ prefix+ selectors.placeOfService+row).val(claimObj.cpts[cpt].place)
          iframe.find('#'+ prefix+ selectors.emg+row).val(claimObj.cpts[cpt].emg)
          iframe.find('#'+ prefix+ selectors.cpt+row).val(extractCpt(cpt))
          iframe.find('#'+ prefix+ selectors.modA+row).val(claimObj.cpts[cpt].modA)
          iframe.find('#'+ prefix+ selectors.modB+row).val(claimObj.cpts[cpt].modB)
          iframe.find('#'+ prefix+ selectors.modC+row).val(claimObj.cpts[cpt].modC)
          iframe.find('#'+ prefix+ selectors.modD+row).val(claimObj.cpts[cpt].modD)
          iframe.find('#'+ prefix+ selectors.charges+row).val(claimObj.cpts[cpt].charge)
          iframe.find('#'+ prefix+ selectors.units+row).val(claimObj.cpts[cpt].days)
          iframe.find('#'+ prefix+ selectors.epsdt+row).val(claimObj.cpts[cpt].epsdt)
          if (selectAllDiag && diagnosisKeys.length<5) {
            iframe.find('#'+ prefix+ selectors.diagnosis+row).val(diagnosisKeys.join(''))
          }
          row++
          }
        }
      if (row>0) return ('Success! ' + (row) + ' row(s) filled.')
      return
    default:
    break
  }
}

// Regex helper functions
function extractMonth(date){
  var month_regex=/^(0[1-9]|1[0-2])/
  if (!month_regex.exec(date)) return
  return month_regex.exec(date)[1]
}

function extractDay(date){
  var day_regex=/\/([0-9]{2})\//
  if (!day_regex.exec(date)) return
  return day_regex.exec(date)[1]
}

function extractYear(date){
  var year_regex=/\/([0-9]{4})/
  if (!year_regex.exec(date)) return
  return year_regex.exec(date)[1]
}

function extractCpt(cptName){
  var cpt_regex=/(\d+)/
  return cpt_regex.exec(cptName)[1]
}

function undoForm(siteObj){
  var row=0
  var success='Undo fill success, rows cleared.'
  switch (siteObj.name){
    case 'OA-Actual':
    case 'Office Ally':
      var iframe=$('#Iframe9').contents()
      var tableRowsId= siteObj.selectors.prefix+siteObj.selectors.table_rows_id
      var current_rows=(iframe.find('#'+tableRowsId).length)/2
      var prefix=siteObj.selectors.prefix
      var selectors=siteObj.selectors

      for (var i=0;i<current_rows;i++){
        iframe.find('#'+ prefix+ selectors.fromMonth + row).val('')
        iframe.find('#'+ prefix+ selectors.toMonth+row).val('')
        iframe.find('#'+ prefix+ selectors.fromDay+row).val('')
        iframe.find('#'+ prefix+ selectors.toDay+row).val('')
        iframe.find('#'+ prefix+ selectors.fromYear+row).val('')
        iframe.find('#'+ prefix+ selectors.toYear+row).val('')
        iframe.find('#'+ prefix+ selectors.placeOfService+row).val('')
        iframe.find('#'+ prefix+ selectors.emg+row).val('')
        iframe.find('#'+ prefix+ selectors.cpt+row).val('')
        iframe.find('#'+ prefix+ selectors.modA+row).val('')
        iframe.find('#'+ prefix+ selectors.modB+row).val('')
        iframe.find('#'+ prefix+ selectors.modC+row).val('')
        iframe.find('#'+ prefix+ selectors.modD+row).val('')
        iframe.find('#'+ prefix+ selectors.charges+row).val('')
        iframe.find('#'+ prefix+ selectors.units+row).val('')
        iframe.find('#'+ prefix+ selectors.epsdt+row).val('')
        iframe.find('#'+ prefix+ selectors.diagnosis+row).val('')
        row++
      }
        return success

      case 'Office Ally Demo':
        var tableRowsId= siteObj.selectors.prefix+siteObj.selectors.table_rows_id
        var current_rows=($('#'+tableRowsId).length)/2
        var prefix=siteObj.selectors.prefix
        var selectors=siteObj.selectors

        for (var i=0;i<current_rows;i++){
          $('#'+ prefix+ selectors.fromMonth + row).val('')
          $('#'+ prefix+ selectors.toMonth+row).val('')
          $('#'+ prefix+ selectors.fromDay+row).val('')
          $('#'+ prefix+ selectors.toDay+row).val('')
          $('#'+ prefix+ selectors.fromYear+row).val('')
          $('#'+ prefix+ selectors.toYear+row).val('')
          $('#'+ prefix+ selectors.placeOfService+row).val('')
          $('#'+ prefix+ selectors.emg+row).val('')
          $('#'+ prefix+ selectors.cpt+row).val('')
          $('#'+ prefix+ selectors.modA+row).val('')
          $('#'+ prefix+ selectors.modB+row).val('')
          $('#'+ prefix+ selectors.modC+row).val('')
          $('#'+ prefix+ selectors.modD+row).val('')
          $('#'+ prefix+ selectors.charges+row).val('')
          $('#'+ prefix+ selectors.units+row).val('')
          $('#'+ prefix+ selectors.epsdt+row).val('')
          $('#'+ prefix+ selectors.diagnosis+row).val('')
          row++
        }
          return success
}
}
