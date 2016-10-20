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
     selectors:{
       fromMonth:'txt_dosFrom(Num)MM',
       fromDay:'txt_dosFrom(Num)DD',
       fromYear:'txt_dosFrom(Num)YYYY',
       toMonth:'txt_dosTo(Num)MM',
       toDay:'txt_dosTo(Num)DD',
       toYear:'txt_dosTo(Num)YYYY',
       placeOfService:'txt_pos(Num)',
       tos:'txt_tos(Num)',
       cpt:'txt_procCode(Num)',
       modA:'txt_modifer(Num)a',
       modB:'txt_modifer(Num)b',
       modC:'txt_modifer(Num)c',
       modD:'txt_modifer(Num)d',
       diagPointerArray:[
         'cb_diagnosisCode(Num)a',
         'cb_diagnosisCode(Num)b',
         'cb_diagnosisCode(Num)c',
         'cb_diagnosisCode(Num)d',
         'cb_diagnosisCode(Num)e',
         'cb_diagnosisCode(Num)f',
         'cb_diagnosisCode(Num)g',
         'cb_diagnosisCode(Num)h',
         'cb_diagnosisCode(Num)i',
         'cb_diagnosisCode(Num)j',
         'cb_diagnosisCode(Num)k',
         'cb_diagnosisCode(Num)l',
       ],
       charges:'txt_charge(Num)',
       units:'txt_days(Num)'
     },
     defaultRows:10,
     maxRows:10
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
   },
   {
     name:'United Health Care Dev',
     url:'localhost:8002',
     supported:true,
     selectors:{
       fromMonth:'txt_dosFrom(Num)MM',
       fromDay:'txt_dosFrom(Num)DD',
       fromYear:'txt_dosFrom(Num)YYYY',
       toMonth:'txt_dosTo(Num)MM',
       toDay:'txt_dosTo(Num)DD',
       toYear:'txt_dosTo(Num)YYYY',
       placeOfService:'txt_pos(Num)',
       tos:'txt_tos(Num)',
       cpt:'txt_procCode(Num)',
       modA:'txt_modifer(Num)a',
       modB:'txt_modifer(Num)b',
       modC:'txt_modifer(Num)c',
       modD:'txt_modifer(Num)d',
       diagPointerArray:[
         'cb_diagnosisCode(Num)a',
         'cb_diagnosisCode(Num)b',
         'cb_diagnosisCode(Num)c',
         'cb_diagnosisCode(Num)d',
         'cb_diagnosisCode(Num)e',
         'cb_diagnosisCode(Num)f',
         'cb_diagnosisCode(Num)g',
         'cb_diagnosisCode(Num)h',
         'cb_diagnosisCode(Num)i',
         'cb_diagnosisCode(Num)j',
         'cb_diagnosisCode(Num)k',
         'cb_diagnosisCode(Num)l',
       ],
       charges:'txt_charge(Num)',
       units:'txt_days(Num)'
     },
     defaultRows:10,
     maxRows:10
   }
]
