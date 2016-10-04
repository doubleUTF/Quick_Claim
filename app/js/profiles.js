// Handler for .ready() call
$(function(){
  var currentCpt=''
  init()

  getAllCpt();
  // Set event listeners on buttons



  // Event listener when selecting from select tab

  $('select[name="cptList"]').on('select2:select',function(evt){
    var selectedValue=evt.currentTarget.value
    currentCpt=selectedValue;
    $('#cptHeader').text('CPT- ' + selectedValue)
    $('#cptDetails').addClass('show')
    showButtons()
    populateFields(currentCpt);

  })

  $('select[name="cptList"]').on('select2:unselect',function(evt){
    currentCpt=''
    clearProfilesTab()
  })

  $('select[name="cptList"]').on('change',function(){
    $('#successMsg').text('');
  })

  // Clear profiles tab
  $('a[href="#profiles"]').on('hide.bs.tab',clearProfilesTab)

  // Delete current cpt button
  $('#inputDelete').on('click',function(){
    store.remove('cpt'+currentCpt);
    $('select[name="cptList"]').find('[value='+currentCpt+']')
    .remove().trigger('change')
    clearProfilesTab();
  })

  // Use jQuery Validate library to validate form inputs
  $('#cptAdd').validate({
    rules:{
      addCptInput:{
        minlength:5,
        digits:true,
        cptInArray:true
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

  // Add custom rule

  jQuery.validator.addMethod('cptInArray',function(value,element){
      return checkCptInArray(currentCpt)},
      "CPT already in database"
  );

  $('#cptDetails').validate({
    rules:{
      inputCharge:{
        number:true
      }
    },
    success:function(label){
      $('#inputSave').prop('disabled',false);
    },
    submitHandler:function(){
      console.log('submitting')
      $('#inputSave').click(saveCpt(currentCpt));
    },
    errorLabelContainer:"#statusMsg",
    invalidHandler:function(){
      $('#inputSave').prop('disabled',true);
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
  // TODO prevent user from inputting CPT thats already in localStorage

  clearFields()
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
  currentCpt=cptCode;
  showButtons()
  addToCptArray(currentCpt);
}

// Remove selected cpt from localStorage then deselect from list.
function removeCpt(){
  console.log(currentCpt)

}

// Save CPT code to localStorage then exit details
function saveCpt(cpt){
  var i=0
  var copyObj= $.extend({},cptObj)
  copyObj.id=cpt;
  copyObj.text=cpt;
  for (p in cptObj){
    if (p=='id' || p=='text'){
      continue
    }
    copyObj[p]=$('#'+cptDetailHtmlList[i]).val()
    i++
  }

  store.set('cpt'+cpt,copyObj);

  $('#successMsg').addClass('valid').addClass('show').text("Saved CPT:  "+cpt)
  // TODO Need a way to prevent mass Saved messages when constantly clicking
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

function populateFields(cpt){
  var i=0
  var cptObj=store.get('cpt'+cpt);
  for (p in cptObj){
    if (p=='id' || p=='text'){
      continue
    }
    $('#'+cptDetailHtmlList[i]).val(cptObj[p])
    i++
  }
}

function clearFields(){
  for (var i=0; i<cptDetailHtmlList.length;i++){
    $('#'+cptDetailHtmlList[i]).val('')
  }
}
function clearProfilesTab(){
  $('#cptHeader').html('&nbsp')
  $('#successMsg').removeClass('show');
  $('#cptDetails').removeClass('show');
  $('select[name="cptList"]').val(null).trigger('change');
  hideButtons();
  clearFields();
}

function addToCptArray(cpt){
  if (!store.get('cptList')){
    store.set('cptList',[])
  }
  var tempArray=store.get('cptList')
  tempArray.push(cpt)
  store.set('cptList',tempArray);
}

function checkCptInArray(cpt){
  var tempArray=$('select[name="cptList"] option').map(function(){return $(this).val()}).toArray()
  tempArray.forEach(function(value){
    //TODO finish cpt in array validation
  })

}
