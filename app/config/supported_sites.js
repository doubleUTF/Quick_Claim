// Supported site list objects
// Selectors are based on element id
const supported_sites=[
    {
     name:"Office Ally",
     url:"www.officeally.com",
     supported:true,
     selectors:{
         // To select element, use $('#'+ siteObj.selectors.prefix+ siteObj.selectors.selector + (row num starting at 0))
       prefix:'ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_',
       fromMonth:'FM_DATE_OF_SVC_MONTH',
       fromDay:'FM_DATE_OF_SVC_DAY',
       fromYear:'FM_DATE_OF_SVC_YEAR',
       toMonth:'TO_DATE_OF_SVC_MONTH',
       toDay:'TO_DATE_OF_SVC_DAY',
       toYear:'TO_DATE_OF_SVC_YEAR',
       placeOfService:'PLACE_OF_SVC',
       emg:'EMG',
       cpt:'CPT_CODE',
       modA:'MODIFIER_A',
       modB:'MODIFIER_B',
       modC:'MODIFIER_C',
       modD:'MODIFIER_D',
       diagnosis:'DOS_DIAG_CODE',
       charges:'DOS_CHRG',
       units:'UNITS',
       epsdt:'EPSDT_FAMILY_PLAN',
       table_rows_id:"Table1 > tbody> tr",
       diag21:'ctl00_phFolderContent_ucHCFA_DIAGNOSIS_CODECMS0212_'
     },
     maxDiagnosisPointers:4,
     defaultRows:12,
     maxRows:50
   },
   {
     name:'Ability Network',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'United Health Care',
     url:'provider-linkhealth.unitedhealthcareonline.com',
     supported:false,
     selectors:{}
   },
   {
     name:'Availity',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Navinet',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Navicure',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Claim MD',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Practice Suite',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Apex Edi',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Emdeon',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Zirmed',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Relayhealth',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Mckesson',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'Realmed',
     url:'',
     supported:false,
     selectors:{}
   },
   {
     name:'OA-Actual',
     url:'localhost:8000',
     supported:true,
     selectors:{
         // To select element, use $('#'+ siteObj.selectors.prefix+ siteObj.selectors.selector + (row num starting at 0))
       prefix:'ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_',
       fromMonth:'FM_DATE_OF_SVC_MONTH',
       fromDay:'FM_DATE_OF_SVC_DAY',
       fromYear:'FM_DATE_OF_SVC_YEAR',
       toMonth:'TO_DATE_OF_SVC_MONTH',
       toDay:'TO_DATE_OF_SVC_DAY',
       toYear:'TO_DATE_OF_SVC_YEAR',
       placeOfService:'PLACE_OF_SVC',
       emg:'EMG',
       cpt:'CPT_CODE',
       modA:'MODIFIER_A',
       modB:'MODIFIER_B',
       modC:'MODIFIER_C',
       modD:'MODIFIER_D',
       diagnosis:'DOS_DIAG_CODE',
       charges:'DOS_CHRG',
       units:'UNITS',
       epsdt:'EPSDT_FAMILY_PLAN',
       table_rows_id:"Table1 > tbody> tr"
     },
     maxDiagnosisPointers:4,
     maxRows:12, //changed this from 50 to 12 cause OA needs to fix their shit
   },
   {
     name:'Office Ally Demo',
     url:'localhost:8001',
     supported:true,
     defaultRows:12,
     selectors:{
         // To select element, use $('#'+ siteObj.selectors.prefix+ siteObj.selectors.selector + (row num starting at 0))
       prefix:'ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_',
       fromMonth:'FM_DATE_OF_SVC_MONTH',
       fromDay:'FM_DATE_OF_SVC_DAY',
       fromYear:'FM_DATE_OF_SVC_YEAR',
       toMonth:'TO_DATE_OF_SVC_MONTH',
       toDay:'TO_DATE_OF_SVC_DAY',
       toYear:'TO_DATE_OF_SVC_YEAR',
       placeOfService:'PLACE_OF_SVC',
       emg:'EMG',
       cpt:'CPT_CODE',
       modA:'MODIFIER_A',
       modB:'MODIFIER_B',
       modC:'MODIFIER_C',
       modD:'MODIFIER_D',
       diagnosis:'DOS_DIAG_CODE',
       charges:'DOS_CHRG',
       units:'UNITS',
       epsdt:'EPSDT_FAMILY_PLAN',
       table_rows_id:"Table1 > tbody> tr"
     },
     maxDiagnosisPointers:4,
     maxRows:12, //changed this from 50 to 12 cause OA needs to fix their shit
   },
   {
     name:'TriZetto_Provider_Solutions',
     url:'',
     supported:false
   }
]
