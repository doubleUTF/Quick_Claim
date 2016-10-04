// Handler for .ready() call
$(function(){
  var currentCPT=''
  init()

  getAllCpt();
  // Set event listeners on buttons
  $('#inputSave').on('click',function(){
    var cpt=currentCPT
    console.log(cpt)
    saveCpt(cpt)
  })


  // Event listener when selecting from select tab

  $('select[name="cptList"]').on('select2:select',function(evt){
    var selectedValue=evt.currentTarget.value
    currentCPT=selectedValue;
    $('#cptHeader').text('CPT- ' + selectedValue)
    $('#cptDetails').addClass('show')
    showButtons()

  })

  $('select[name="cptList"]').on('select2:unselect',function(evt){
    var selectedValue=evt.currentTarget.value
    currentCPT=''
    $('#cptHeader').html('&nbsp')
    $('#cptDetails').removeClass('show')
    hideButtons()
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
        number:true
      }
    },
    errorLabelContainer:"#statusMsg",
    invalidHandler:function(){
      console.log('invoking invalid handler')
      $('#inputSave').button('disable')
    }
  })
});


// Helper functions
// Initialize store.js
function init() {
    if (!store.enabled) {
        alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
        return
    }}

// Globals

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

// Add CPT code to localStorage then open details for specified CPT
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
  $('#cptHeader').text('CPT- ' + cptCode)
  $('#cptDetails').addClass('show');
  $('#inputCharge').focus();
  currentCPT=cptCode;
  showButtons()

}

function getCpt(cpt){

}

// Remove selected cpt from localStorage then deselect from list.
function removeCpt(){

}

// Save CPT code to localStorage then exit details
function saveCpt(cpt){
  var i=0
  var copyObj= $.extend({},cptObj)
  for (p in cptObj){
    if (p=='id' || p=='text'){
      continue
    }
    copyObj[p]=$('#'+cptDetailHtmlList[i]).val()
    i++
  }
  store.set('cpt'+cpt,copyObj);
  
}

const cptDetailHtmlList=['inputCharge','inputPlace','inputDays','inputEmg','inputModA',
'inputModB','inputModC','inputModD','inputEpsdt']

// CPT JSON Data Model
var cptObj={
  id:'',
  text:'',
  charge:'',
  place:'',
  days:'',
  emg:'',
  modA:'',
  modB:'',
  modC:'',
  modD:'',
  epsdt:'',
}

function showButtons(){
  $('#inputSave').addClass('show')
  $('#inputDelete').addClass('show')
}

function hideButtons(){
  $('#inputSave').removeClass('show')
  $('#inputDelete').removeClass('show')
}
function debug(){
  console.log($('select')==$('select[name="cptList"]'))
}
