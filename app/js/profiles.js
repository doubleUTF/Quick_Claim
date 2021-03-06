// Handler for .ready() call
$(function() {
  var currentCpt = "";
  init();

  updateSelect();

  //////////////// Register event listeners

  // Event listener when selecting from select tab
  $('select[name="cptList"]').on("select2:select", function(evt) {
    var selectedValue = evt.currentTarget.value;
    currentCpt = selectedValue;
    $("#cptHeader").text("CPT- " + selectedValue);
    $("#cptDetails").addClass("show");
    $("#statusMsg >label").text("");
    $("#inputCharge").focus();
    showButtons();
    populateFields(currentCpt);
  });

  $('select[name="cptList"]').on("select2:unselect", function(evt) {
    currentCpt = "";
    clearProfilesTab();
  });

  $('select[name="cptList"]').on("change", function() {
    $("#successMsg").text("");
  });

  // Clear profiles tab when switching out tab
  $('a[href="#profiles"]').on("hide.bs.tab", clearProfilesTab);

  // Delete cpt handler
  $("#inputDelete").on("click", function() {
    deleteCpt();
  });

  // Use jQuery Validate library to validate form inputs
  $("#cptAdd").validate({
    rules: {
      addCptInput: {
        minlength: 5,
        digits: true,
        blank: true,
        cptInArray: true
      }
    },
    messages: {
      addCptInput: {
        minlength: "CPT Code must be length of 5"
      }
    },
    errorLabelContainer: "#statusMsg",
    submitHandler: addCpt,
    errorClass: "error"
  });

  // Add custom rule to make sure cpt input is not already in cptList

  jQuery.validator.addMethod(
    "cptInArray",
    function(value, element) {
      var currentCptInput = $("#addCptInput").val();
      return !checkCptInArray(currentCptInput);
    },
    "CPT already in database"
  );

  // Rule to make sure input value is not blank
  jQuery.validator.addMethod(
    "blank",
    function(value) {
      var currentCptInput = $("#addCptInput").val();
      return currentCptInput != "";
    },
    "CPT Code must be length of 5"
  );

  $("#cptDetails").validate({
    rules: {
      inputCharge: {
        number: true
      }
    },
    success: function(label) {
      $("#inputSave").prop("disabled", false);
    },
    submitHandler: function() {
      $("#inputSave").click(saveCpt(getCurrentCpt()));
    },
    errorLabelContainer: "#statusMsg",
    invalidHandler: function() {
      $("#inputSave").prop("disabled", true);
    }
  });
}); // End of document ready

// Constants
const cptDetailHtmlList = [
  "inputCharge",
  "inputPlace",
  "inputDays",
  "inputEmg",
  "inputModA",
  "inputModB",
  "inputModC",
  "inputModD",
  "inputEpsdt"
];

// CPT JSON Data Model
const cptObj = {
  id: "",
  text: "",
  charge: "",
  place: "",
  days: "",
  emg: "",
  modA: "",
  modB: "",
  modC: "",
  modD: "",
  epsdt: ""
};

// Helper functions
// Initialize store.js
function init() {
  if (!store.enabled) {
    alert(
      'Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.'
    );
    return;
  }
}

// Methods to add, remove, save CPT codes
// to localStorage with store.js

// Get array of cpt objects
function getCptArray() {
  var allObjs = store.getAll();
  delete allObjs.cptList;
  var array = $.map(allObjs, function(value, index) {
    return value;
  });
  return array;
}

// StorageEvent is not supported on same page
// Must use function to update select list
function updateSelect() {
  $('select[name="cptList"]').select2({
    placeholder: "Select a code",
    allowClear: true,
    data: getCptArray()
  });
}

// Add CPT code to localStorage then open details for specified CPT
function addCpt() {
  clearFields();
  var cptCode = $("#addCptInput").val();
  currentCpt = cptCode;
  var $selectBox = $('select[name="cptList"]').select2();
  var tempObj = $.extend({}, cptObj);
  tempObj.id = cptCode;
  tempObj.text = cptCode;
  store.set("cpt" + cptCode, tempObj);
  updateSelect();
  $("#addCptInput").val("");
  $selectBox.val(cptCode).trigger("change");
  $("#cptHeader").text("CPT- " + cptCode);
  $("#cptDetails").addClass("show");
  $("#inputCharge").focus();
  showButtons();
}

// Save CPT code to localStorage then exit details
function saveCpt(cpt) {
  var i = 0;
  var copyObj = $.extend({}, cptObj);
  copyObj.id = cpt;
  copyObj.text = cpt;
  for (p in cptObj) {
    if (p == "id" || p == "text") {
      continue;
    }
    copyObj[p] = $("#" + cptDetailHtmlList[i]).val();
    i++;
  }
  store.set("cpt" + cpt, copyObj);
  clearProfilesTab();
  $("#successMsg")
    .addClass("valid")
    .addClass("show")
    .text("Saved CPT:  " + cpt);
}

function deleteCpt() {
  var currCpt = getCurrentCpt();
  $('select[name="cptList"]')
    .find("[value=" + currCpt + "]")
    .remove()
    .trigger("change");
  store.remove("cpt" + currCpt);
  clearProfilesTab();
  $("#successMsg")
    .addClass("show")
    .text("Deleted CPT  " + currCpt)
    .addClass("deleted")
    .addClass("text-center");
}

function showButtons() {
  $("#inputSave").addClass("show");
  $("#inputDelete").addClass("show");
}

function hideButtons() {
  $("#inputSave").removeClass("show");
  $("#inputDelete").removeClass("show");
}

function populateFields(cpt) {
  var i = 0;
  var cptObj = store.get("cpt" + cpt);
  for (p in cptObj) {
    if (p == "id" || p == "text") {
      continue;
    }
    $("#" + cptDetailHtmlList[i]).val(cptObj[p]);
    i++;
  }
}

function clearFields() {
  for (var i = 0; i < cptDetailHtmlList.length; i++) {
    $("#" + cptDetailHtmlList[i]).val("");
  }
}

function clearProfilesTab() {
  $("#cptHeader").html("&nbsp");
  $("#successMsg").removeClass("show");
  $("#cptDetails").removeClass("show");
  $('select[name="cptList"]')
    .val(null)
    .trigger("change");
  $("#statusMsg >label").text("");
  $("#addCptInput").val("");
  hideButtons();
  clearFields();
  currentCpt = "";
}

function checkCptInArray(cpt) {
  var tempArray = $('select[name="cptList"] option')
    .map(function() {
      return $(this).val();
    })
    .toArray();
  return numInList(cpt, tempArray);
}

function numInList(num, list) {
  var ans = list.indexOf(num);
  if (ans == -1) {
    return false;
  }
  return true;
}

function getCurrentCpt() {
  var headerCpt = $("#cptHeader").text();
  if (!headerCpt) return;
  var currCpt = headerCpt.replace(/([A-Za-z-\s])+/, "");
  return currCpt;
}
