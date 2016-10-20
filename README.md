Quick Claim extension for Google Chrome
==============================
Filing electronic medical claims on sites such as Office Ally or MD-Online
requires tedious and repetitive data entry. Quick Claim is a
Chrome extension meant to save time by remembering
your settings and automatically filling out the dense
portion of the form (Field 24 of CMS 1500). Quick Claim is
ideal when entering same, repeating data. In most cases, the only data
that changes are dates of service and diagnoses.

Requirements:
Chrome Browser
Office Ally CMS-1500 HCFA Form section

To Install:
- Look up 'Quick Claim' in Chrome Web Store
- Download github repository, go to chrome://extensions
  and click 'Load unpacked extension' and install the root/app folder.

Default popup hotkey in Chrome: Ctrl+Q

How to Use:
1. Ensure you are on a supported site(Office Ally only in beta) and at the HCFA-1500 form section. The status bar on the Claim Form tab will indicate this.
Fill out sections 1-21 either by loading saved patient data or entering new data.

2. Go to the Profiles tab to setup and save profile data for commonly used CPT codes. These codes are not specific to any patient or site and can thus be used for any patient. You only need to do this once per CPT.

3. Go to Claim Form tab, enter CPT codes and dates. Click Fill Form button and verify data is correct. Quick Claim will automatically provide each date of service for all CPT codes and all diagnosis for each CPT. If this is undesired, click Undo Fill and enter data manually.

For developers:
To run the demo site, install repo, go to root folder in console then type:

 - Office Ally: 'npm run oa'
 - United Health Care: 'npm run uhc'

To build dist folder: just run 'gulp'

============Change Log=============
v0.9.1.1
- Added Chrome button shortcut link in 'About' tab

Beta v0.9.1
- Only supports Office Ally at the moment.
- Next sites to support: United Health Care, Ability Network
- Updated this readme file


Comments, questions, suggestions: doubleutf26@gmail.com
