// Look for entered ICD-10 diagnoses on form section 21
// and return an array of codes.

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "getDiagnoses") {
    sendResponse(getDiagnoses(request.siteName));
  } else if (request.message == "fillForm") {
    fillForm(
      JSON.parse(request.siteObj),
      JSON.parse(request.claimObj),
      function (response) {
        sendResponse(response);
      }
    );
    return true;
  } else if (request.message == "undoForm") {
    sendResponse(undoForm(JSON.parse(request.siteObj)));
  }
});

const diagLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

function getDiagnoses(siteName) {
  var diagnosisKeys = [];
  switch (siteName) {
    case "Office Ally Demo":
    case "Office Ally":
      var iframe = $("#Iframe9").contents();
      for (var i = 1; i < 13; i++) {
        var j = i - 1;
        var code = iframe
          .find("#ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_" + i)
          .val();
        if (code) {
          diagnosisKeys.push(diagLetters[j]);
        }
      }
      return diagnosisKeys;
    case "United Health Care Dev":
    case "United Health Care":
      for (var i = 0; i < 4; i++) {
        var code = document.getElementById("diagnosis-code-data-" + i);
        code && code.value && diagnosisKeys.push(i + 1);
      }
      return diagnosisKeys;
    default:
      break;
  }
}

function fillForm(siteObj, claimObj, callback) {
  switch (siteObj.name) {
    case "Office Ally":
    case "Office Ally Demo":
      var rowsRequired = claimObj.rows;
      var maxRows = siteObj.maxRows;
      var tableElement = document
        .getElementById("Iframe9")
        .contentWindow.document.getElementById(
          "ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_Table1"
        );
      var currentRows = tableElement.children[0].children.length / 2; // Quick and dirty way to get state of current rows
      var rowsToAdd = rowsRequired - currentRows;
      if (maxRows < rowsRequired) {
        return callback(
          "Error, " +
            rowsRequired +
            " rows required but only " +
            maxRows +
            " allowed."
        );
      } else if (rowsToAdd > 0) {
        for (var i = 0; i < rowsToAdd; i++) {
          document
            .getElementById("Iframe9")
            .contentWindow.document.getElementById("btnAddRow")
            .click();
        }
      }
      callback(populateForm(siteObj, claimObj));
      break;
    case "United Health Care Dev":
    case "United Health Care":
      var rowsRequired = claimObj.rows;
      var maxRows = siteObj.maxRows;
      var boxContainer = document
        .getElementsByClassName("box")[2]
        .getElementsByTagName("fieldset")[0]
        .querySelector("div");
      var currentRows = boxContainer.children.length - 3; // 3 default items not part of line numbers
      var rowsToAdd = rowsRequired - currentRows;
      if (maxRows < rowsRequired) {
        return callback(
          "Error, " +
            rowsRequired +
            " rows required but only " +
            maxRows +
            " allowed."
        );
      } else if (rowsToAdd > 0) {
        for (var i = 0; i < rowsToAdd; i++) {
          document.getElementById("servicelines-add-row-button").click();
        }
      }
      callback(populateForm(siteObj, claimObj));
      break;
    default:
      break;
  }
}

// Meat of the app. Fill those rows up baby!
function populateForm(siteObj, claimObj) {
  var diagnosisKeys = getDiagnoses(siteObj.name);
  var row = 0;
  var prefix = siteObj.selectors.prefix;
  var selectors = siteObj.selectors;

  // Begin populating rows
  switch (siteObj.name) {
    case "Office Ally Demo":
    case "Office Ally":
      var iframe = $("#Iframe9").contents();
      for (var i = 0; i < claimObj.dates.length; i++) {
        if (
          !extractMonth(claimObj.dates[i]) ||
          !extractDay(claimObj.dates[i]) ||
          !extractYear(claimObj.dates[i])
        ) {
          return "Invalid date: " + claimObj.dates[i];
        }
        for (cpt in claimObj.cpts) {
          iframe
            .find("#" + prefix + selectors.fromMonth + row)
            .val(extractMonth(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.toMonth + row)
            .val(extractMonth(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.fromDay + row)
            .val(extractDay(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.toDay + row)
            .val(extractDay(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.fromYear + row)
            .val(extractYear(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.toYear + row)
            .val(extractYear(claimObj.dates[i]));
          iframe
            .find("#" + prefix + selectors.placeOfService + row)
            .val(claimObj.cpts[cpt].place);
          iframe
            .find("#" + prefix + selectors.emg + row)
            .val(claimObj.cpts[cpt].emg);
          iframe.find("#" + prefix + selectors.cpt + row).val(extractCpt(cpt));
          iframe
            .find("#" + prefix + selectors.modA + row)
            .val(claimObj.cpts[cpt].modA);
          iframe
            .find("#" + prefix + selectors.modB + row)
            .val(claimObj.cpts[cpt].modB);
          iframe
            .find("#" + prefix + selectors.modC + row)
            .val(claimObj.cpts[cpt].modC);
          iframe
            .find("#" + prefix + selectors.modD + row)
            .val(claimObj.cpts[cpt].modD);
          iframe
            .find("#" + prefix + selectors.charges + row)
            .val(claimObj.cpts[cpt].charge);
          iframe
            .find("#" + prefix + selectors.units + row)
            .val(claimObj.cpts[cpt].days);
          iframe
            .find("#" + prefix + selectors.epsdt + row)
            .val(claimObj.cpts[cpt].epsdt);
          if (diagnosisKeys.length < 5) {
            iframe
              .find("#" + prefix + selectors.diagnosis + row)
              .val(diagnosisKeys.join(""));
          }
          row++;
        }
      }
      if (row > 0) return "Success! " + row + " row(s) filled.";
      break;
    case "United Health Care Dev":
    case "United Health Care":
      const diagnosisSelectors = [
        selectors.diagnosisA,
        selectors.diagnosisB,
        selectors.diagnosisC,
        selectors.diagnosisD,
      ];
      for (var i = 0; i < claimObj.dates.length; i++) {
        if (
          !extractMonth(claimObj.dates[i]) ||
          !extractDay(claimObj.dates[i]) ||
          !extractYear(claimObj.dates[i])
        )
          return "Invalid date: " + claimObj.dates[i];
        for (cpt in claimObj.cpts) {
          document.getElementById(selectors.fromDate + "-" + row).value =
            claimObj.dates[i];
          document.getElementById(selectors.toDate + "-" + row).value =
            claimObj.dates[i];
          document.getElementById(selectors.cpt + "-" + row).value = extractCpt(
            cpt
          );
          document.getElementById(selectors.modA + "-" + row).value = claimObj
            .cpts[cpt].modA
            ? claimObj.cpts[cpt].modA
            : "";
          document.getElementById(selectors.modB + "-" + row).value = claimObj
            .cpts[cpt].modB
            ? claimObj.cpts[cpt].modB
            : "";
          document.getElementById(selectors.modC + "-" + row).value = claimObj
            .cpts[cpt].modC
            ? claimObj.cpts[cpt].modC
            : "";
          document.getElementById(selectors.modD + "-" + row).value = claimObj
            .cpts[cpt].modD
            ? claimObj.cpts[cpt].modD
            : "";
          for (var k = 0; k < diagnosisKeys.length; k++) {
            document.getElementById(diagnosisSelectors[k] + "-" + row).value =
              diagnosisKeys[k];
          }
          document.getElementById(
            selectors.charges + "-" + row
          ).value = claimObj.cpts[cpt].charge ? claimObj.cpts[cpt].charge : "";
          document.getElementById(selectors.units + "-" + row).value = claimObj
            .cpts[cpt].days
            ? claimObj.cpts[cpt].days
            : "";
          row++;
        }
      }
      if (row > 0) return "Success! " + row + " row(s) filled.";
      break;
    default:
      break;
  }
}

// Regex helper functions
function extractMonth(date) {
  var month_regex = /^(0[1-9]|1[0-2])/;
  if (!month_regex.exec(date)) return;
  return month_regex.exec(date)[1];
}

function extractDay(date) {
  var day_regex = /\/([0-9]{2})\//;
  if (!day_regex.exec(date)) return;
  return day_regex.exec(date)[1];
}

function extractYear(date) {
  var year_regex = /\/([0-9]{4})/;
  if (!year_regex.exec(date)) return;
  return year_regex.exec(date)[1];
}

function extractCpt(cptName) {
  var cpt_regex = /(\d+)/;
  return cpt_regex.exec(cptName)[1];
}

function replaceNum(selString, num) {
  var num_regex = /\(Num\)/;
  var replaced_string = selString.replace(num_regex, num);
  return replaced_string;
}

function undoForm(siteObj) {
  var row = 0;
  var success = "Undo fill success, rows cleared.";
  var selectors = siteObj.selectors;
  switch (siteObj.name) {
    case "Office Ally Demo":
    case "Office Ally":
      var iframe = $("#Iframe9").contents();
      var tableRowsId =
        siteObj.selectors.prefix + siteObj.selectors.table_rows_id;
      var current_rows = iframe.find("#" + tableRowsId).length / 2;
      var prefix = siteObj.selectors.prefix;

      for (var i = 0; i < current_rows; i++) {
        iframe.find("#" + prefix + selectors.fromMonth + row).val("");
        iframe.find("#" + prefix + selectors.toMonth + row).val("");
        iframe.find("#" + prefix + selectors.fromDay + row).val("");
        iframe.find("#" + prefix + selectors.toDay + row).val("");
        iframe.find("#" + prefix + selectors.fromYear + row).val("");
        iframe.find("#" + prefix + selectors.toYear + row).val("");
        iframe.find("#" + prefix + selectors.placeOfService + row).val("");
        iframe.find("#" + prefix + selectors.emg + row).val("");
        iframe.find("#" + prefix + selectors.cpt + row).val("");
        iframe.find("#" + prefix + selectors.modA + row).val("");
        iframe.find("#" + prefix + selectors.modB + row).val("");
        iframe.find("#" + prefix + selectors.modC + row).val("");
        iframe.find("#" + prefix + selectors.modD + row).val("");
        iframe.find("#" + prefix + selectors.charges + row).val("");
        iframe.find("#" + prefix + selectors.units + row).val("");
        iframe.find("#" + prefix + selectors.epsdt + row).val("");
        iframe.find("#" + prefix + selectors.diagnosis + row).val("");
        row++;
      }
      return success;
  }
}
