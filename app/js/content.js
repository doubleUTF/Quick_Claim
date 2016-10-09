// Look for entered ICD-10 diagnoses on form section 21
// and return an array of codes.

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    if (request.message='getDiagnoses'){
      sendResponse(getDiagnoses());
    }
  }
)
function getDiagnoses(){
  var diagnosisArray=[]
  for (var i=1;i<13;i++){
    var code=$('#ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_'+i).val()
    if (code){
    diagnosisArray.push(code);
  }
  }
  return diagnosisArray
}
