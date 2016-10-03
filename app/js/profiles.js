// Handler for .ready() call
$(function(){
  init()

  getAllCpt();
  // Set event listeners on buttons
  $('')


  // Event listener when selecting from select tab

  $('select').on('select2:select',function(evt){
    console.log('Select event triggered')
    var selectedValue=evt.currentTarget.value
    $('#cptHeader').text('CPT- ' + selectedValue)
    $('#cptForm').addClass('show')

  })

  $('select').on('select2:unselect',function(evt){
    var selectedValue=evt.currentTarget.value
    $('#cptHeader').html('&nbsp')
    $('#cptForm').removeClass('show')
  })

  // Use jQuery Validate library to validate form inputs
  $('#cptAdd').validate({
    rules:{
      addCptInput:{
        minlength:5,
        digits:true
      }
    },
    messages:{
      addCptInput:{
        minlength: 'CPT Code must be length of 5'
      }
    },
    errorLabelContainer:'#statusMsg',
    submitHandler:addCpt,
    errorClass:'error'
    })
  $('#cptDetails').validate({
    rules:{
      inputCharge:{
        digits:true
      }
    },
    errorLabelContainer:"#statusMsg"
  })
});


// Helper functions
// Initialize store.js
function init() {
    if (!store.enabled) {
        alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
        return
    }}

// Methods to add, remove, save CPT codes
// to localStorage with store.js

// Get array of cpt objects
function getCptArray(){
  var allObjs=store.getAll()
  delete allObjs.cptList;
  var array=$.map(allObjs,function(value,index){
  return value;
})
  return array
}

// StorageEvent is not supported on same page
// Must use function to update select list
function updateSelect(){
  $('select[name="cptList"]').select2({
     placeholder:'Select a code',
     allowClear:true,
     data:getCptArray()
   })
}

// Initialize and return obj of all CPT Codes
function getAllCpt(){
  if (store.get('cptList')===null){
    store.set('cptList',[]);
  }
  updateSelect()
  }

function addCpt(){
  var cptCode=$('#addCptInput').val()
  var $selectBox=$('select[name="cptList"]').select2();
  var tempObj= $.extend({},cptObj)
  tempObj.id=cptCode;
  tempObj.text=cptCode;
  store.set('cpt'+cptCode,tempObj);
  updateSelect()
  $('#addCptInput').val('');
  $selectBox.val(cptCode).trigger('change');
}

function getCpt(cpt){

}

function removeCpt(){

}

function saveCPT(){

}

// CPT JSON Data Model
var cptObj={
  id:'',
  text:'',
  place:'',
  days:'',
  emg:'',
  modA:'',
  modB:'',
  modC:'',
  modD:'',
  epsdt:'',
}
