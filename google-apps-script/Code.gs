/**
 * Jamoka Properties — Universal Google Sheets Apps Script (All Website Forms)
 *
 * How it works:
 * 1. Receives POST JSON submissions from EVERY form on the Jamoka Properties website:
 *    - Homepage Inquiry Desk
 *    - Contact Page (including Services, Golden Visa, Developers, CEO & COO inquiries)
 *    - Private Investment Landing Page (AED 5M / AED 10M forms)
 *    - Team Consultation Bookings
 *    - Property / Off-Plan Project Modals
 *    - Mortgage Consultation Form
 *    - Careers / Job Applications
 *    - Campaign Landing Pages (Mercedes-Benz Places & dynamic campaigns)
 * 2. Writes EVERY submission to the master "All Leads" tab.
 * 3. ALSO automatically organizes each submission into its matching category tab
 *    (e.g., "Private Investment", "Homepage & Contact", "Services & Visa",
 *     "Projects & Developers", "Team & Executive", "Mortgage", "Careers",
 *     "Campaign Landings").
 */

var MASTER_TAB_NAME = 'All Leads';

var MASTER_HEADERS = [
  'Timestamp (Dubai GST)',
  'Category Tab',
  'Form Source',
  'Subject',
  'Full Name',
  'Email',
  'Phone',
  'WhatsApp Link',
  'Country',
  'Preferred Language',
  'Budget / Tier',
  'Currency',
  'Preference / Timeline',
  'Project',
  'Developer',
  'Price / Financing',
  'Down Payment',
  'Monthly Payment',
  'Office / Advisor',
  'Job Position',
  'Department / Location',
  'Residency Status',
  'CV / Portfolio Link',
  'Message / Notes',
  'Page URL',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Extra Details'
];

var CAREERS_HEADERS = [
  'Timestamp (Dubai GST)',
  'Job Position',
  'Department',
  'Location',
  'Full Name',
  'Email',
  'Phone',
  'WhatsApp Link',
  'Residency Status',
  'CV / Portfolio Link',
  'Cover Note',
  'Page URL'
];

function formatDubaiTime(isoString) {
  var date = isoString ? new Date(isoString) : new Date();
  if (isNaN(date.getTime())) date = new Date();
  return Utilities.formatDate(date, 'Asia/Dubai', 'yyyy-MM-dd HH:mm:ss');
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#0A0D14');
    headerRange.setFontColor('#CFA55A');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function buildMasterRow(data, timestampStr, categoryTab) {
  var priceOrFinancing = [data.price, data.financingType].filter(Boolean).join(' | ');
  var officeOrAdvisor = [data.office, data.advisor].filter(Boolean).join(' | ');
  var deptOrLoc = [data.department, data.location].filter(Boolean).join(' | ');
  var prefOrTimeline = [data.preference, data.timeline].filter(Boolean).join(' | ');

  return [
    timestampStr,
    categoryTab,
    data.source || '',
    data.subject || '',
    data.fullName || data.name || '',
    data.email || '',
    data.phone ? "'" + data.phone : '',
    data.whatsAppLink || '',
    data.country || '',
    data.preferredLanguage || '',
    data.budget || '',
    data.displayedCurrency || '',
    prefOrTimeline,
    data.project || '',
    data.developer || '',
    priceOrFinancing,
    data.downPayment || '',
    data.monthlyPayment || '',
    officeOrAdvisor,
    data.position || '',
    deptOrLoc,
    data.residencyStatus || '',
    data.portfolioUrl || '',
    data.message || data.coverNote || data.notes || '',
    data.pageUrl || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || '',
    data.extraDetails || ''
  ];
}

function buildCareersRow(data, timestampStr) {
  return [
    timestampStr,
    data.position || '',
    data.department || '',
    data.location || '',
    data.fullName || data.name || '',
    data.email || '',
    data.phone ? "'" + data.phone : '',
    data.whatsAppLink || '',
    data.residencyStatus || '',
    data.portfolioUrl || '',
    data.message || data.coverNote || '',
    data.pageUrl || ''
  ];
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawBody = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(rawBody);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestampStr = formatDubaiTime(data.timestamp);
    var categoryTab = data.sheetTab || 'Homepage & Contact';

    // 1. Always append to the master "All Leads" sheet
    var masterSheet = getOrCreateSheet(ss, MASTER_TAB_NAME, MASTER_HEADERS);
    var masterRow = buildMasterRow(data, timestampStr, categoryTab);
    masterSheet.appendRow(masterRow);

    // 2. Also append to the dedicated category tab for clean filtering
    if (categoryTab === 'Careers') {
      var careersSheet = getOrCreateSheet(ss, 'Careers', CAREERS_HEADERS);
      careersSheet.appendRow(buildCareersRow(data, timestampStr));
    } else if (categoryTab !== MASTER_TAB_NAME) {
      var categorySheet = getOrCreateSheet(ss, categoryTab, MASTER_HEADERS);
      categorySheet.appendRow(masterRow);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', tab: categoryTab }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      service: 'Jamoka Properties Unified Forms -> Google Sheets Webhook'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
