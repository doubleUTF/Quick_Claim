$(document).ready(function(){
  // Check for Office Ally
  if ($("div[class='pageheader']")
   .text().trim()=="CMS 1500 02/12 Form" &&
   $("head>title").text().trim()=="Office Ally -- Secure Master" ) {
    chrome.runtime.sendMessage({
      "message":"showPage",
      "site":"OA"})
  } else {
    chrome.runtime.sendMessage({
      "message":"showPage",
      "site":"dev"
    });
  }
})
