// About/Help section
$(function(){ // Start of document ready

  chrome.commands.getAll(function(commands){
    var short=commands[0].shortcut
    $('#shortcut').text('Shortcut Key: '+ short ).on('click',function(){
      chrome.tabs.create({
        url:'chrome://extensions/configureCommands'
      })
    })
  })

  $('#demoButton').on('click',function(){
    window.open(chrome.extension.getURL('demo/demo.html')
  )})

  $('#githubBtn').on('click',function(){
    chrome.tabs.create({
      url:"https://github.com/doubleUTF/Quick_Claim"
    })
  })
}) // End of document ready
