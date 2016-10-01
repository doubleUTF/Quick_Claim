// Handler for .ready() call
$(function(){
  init()
  $('#inputAdd').on('click',addCpt)
  $('select[name="cptList"]').select2({
     color:'black'
  });
});

// Helper functions
// Initialize store.js
function init() {
    if (!store.enabled) {
        alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
        return
    }}

function addCpt(){
  console.log('adding CPT')
  var cptCode=$('#addCptInput').val()
  var selectBox=$('select[name="cptList"]')
  selectBox.prepend("<option>"+cptCode+"</option>")
}
