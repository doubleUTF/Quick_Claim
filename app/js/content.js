// Globals
var site=''

  // Check for Office Ally
  if ($("div[class='pageheader']")
   .text().trim()=="CMS 1500 02/12 Form" &&
   $("head>title").text().trim()=="Office Ally -- Secure Master" ) {
   site='Office Ally'
    chrome.runtime.sendMessage({
      "message":"showPage",
      "site":"OA"})
  } else {  // For development mode only
     site='Dev Mode'
    chrome.runtime.sendMessage({
      "message":"showPage",
      "site":"dev"
    });
  }

chrome.runtime.onMessage.addListener(
  function(msg,sender,response){
    if ((msg.from=='popup') && (msg.body=='getInfo')){
    };
    response(site);
  })
