$(function(){

  // Event listeners to show description on hover
  // over settings
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
