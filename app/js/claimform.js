// On document ready
window.addEventListener('DOMContentLoaded', function(){

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

  // Popup tooltip on settings tab
  $('#checkbox1').hover(function(){
    $('#popup1').show()
  },function(){
    $('#popup1').hide()
  })

  $('#checkbox2').hover(function(){
    $('#popup2').show()
  },function(){
    $('#popup2').hide()
  })

})
// Helper functions
