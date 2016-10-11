// Look for entered ICD-10 diagnoses on form section 21
// and return an array of codes.

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message='getDiagnoses'){
      sendResponse(getDiagnoses(request.site));
    }
  }
)

const diagLetters=['A','B','C','D','E','F',
                   'G','H', 'I','J','K','L']

function getDiagnoses(site){
  var diagnosisArray={}
  switch (site){
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
