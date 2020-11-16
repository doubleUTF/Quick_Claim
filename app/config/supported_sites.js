// Supported site list objects
// Selectors are based on element id
const supported_sites = [
  {
    name: "Office Ally",
    url: "www.officeally.com",
    supported: true,
    selectors: {
      // To select element, use $('#'+ siteObj.selectors.prefix+ siteObj.selectors.selector + (row num starting at 0))
      prefix: "ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_",
      fromMonth: "FM_DATE_OF_SVC_MONTH",
      fromDay: "FM_DATE_OF_SVC_DAY",
      fromYear: "FM_DATE_OF_SVC_YEAR",
      toMonth: "TO_DATE_OF_SVC_MONTH",
      toDay: "TO_DATE_OF_SVC_DAY",
      toYear: "TO_DATE_OF_SVC_YEAR",
      placeOfService: "PLACE_OF_SVC",
      emg: "EMG",
      cpt: "CPT_CODE",
      modA: "MODIFIER_A",
      modB: "MODIFIER_B",
      modC: "MODIFIER_C",
      modD: "MODIFIER_D",
      diagnosis: "DOS_DIAG_CODE",
      charges: "DOS_CHRG",
      units: "UNITS",
      epsdt: "EPSDT_FAMILY_PLAN",
      table_rows_id: "Table1 > tbody> tr",
      diag21: "ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_",
    },
    maxDiagnosisPointers: 4,
    defaultRows: 12,
    maxRows: 50,
  },
  {
    name: "Ability Network",
    url: "",
    supported: false,
    selectors: {},
    notes:
      "Will not be supported due to complexity of adding rows" +
      " making calls to ASP framework which I cannot handle atm.",
  },
  {
    name: "United Health Care",
    url: "provider-linkhealth.unitedhealthcareonline.com",
    supported: false,
    notes:
      "UI was completely updated around 2017-2018, all previous selectors are now removed now.",
  },
  {
    name: "United Health Care Dev",
    supported: true,
    notes: "UI updated, hopefully will support",
    url: "localhost:8002",
    defaultRows: 1,
    selectors: {
      // ${selector}-${num}
      fromDate: "input-from",
      toDate: "input-to",
      cpt: "cpt-hcpc-code-data",
      modA: "input-modifier-1",
      modB: "input-modifier-2",
      modC: "input-modifier-3",
      modD: "input-modifier-4",
      diagnosisA: "input-diagnosis-1",
      diagnosisB: "input-diagnosis-2",
      diagnosisC: "input-diagnosis-3",
      diagnosisD: "input-diagnosis-4",
      charges: "charge-value",
      units: "daysorunits-input",
    },
    maxDiagnosisPointers: 4,
    maxRows: 50,
  },
  {
    name: "United Health Care",
    supported: true,
    notes: "UI updated, hopefully will support",
    url: "provider-apps.linkhealth.com",
    defaultRows: 1,
    selectors: {
      // ${selector}-${num}
      fromDate: "input-from",
      toDate: "input-to",
      cpt: "cpt-hcpc-code-data",
      modA: "input-modifier-1",
      modB: "input-modifier-2",
      modC: "input-modifier-3",
      modD: "input-modifier-4",
      diagnosisA: "input-diagnosis-1",
      diagnosisB: "input-diagnosis-2",
      diagnosisC: "input-diagnosis-3",
      diagnosisD: "input-diagnosis-4",
      charges: "charge-value",
      units: "daysorunits-input",
    },
    maxDiagnosisPointers: 4,
    maxRows: 50,
  },
  {
    name: "Availity",
    url: "",
    supported: false,
    selectors: {},
  },
  {
    name: "Office Ally Demo",
    url: "localhost:8001",
    supported: true,
    defaultRows: 12,
    selectors: {
      // To select element, use $('#'+ siteObj.selectors.prefix+ siteObj.selectors.selector + (row num starting at 0))
      prefix: "ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_",
      fromMonth: "FM_DATE_OF_SVC_MONTH",
      fromDay: "FM_DATE_OF_SVC_DAY",
      fromYear: "FM_DATE_OF_SVC_YEAR",
      toMonth: "TO_DATE_OF_SVC_MONTH",
      toDay: "TO_DATE_OF_SVC_DAY",
      toYear: "TO_DATE_OF_SVC_YEAR",
      placeOfService: "PLACE_OF_SVC",
      emg: "EMG",
      cpt: "CPT_CODE",
      modA: "MODIFIER_A",
      modB: "MODIFIER_B",
      modC: "MODIFIER_C",
      modD: "MODIFIER_D",
      diagnosis: "DOS_DIAG_CODE",
      charges: "DOS_CHRG",
      units: "UNITS",
      epsdt: "EPSDT_FAMILY_PLAN",
      table_rows_id: "Table1 > tbody> tr",
    },
    maxDiagnosisPointers: 4,
    maxRows: 50,
  },
];
