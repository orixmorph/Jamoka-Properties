/**
 * Careers Application Submission Engine
 *
 * Transmits candidate application data directly to:
 * 1. Google Sheets (via your deployed Google Apps Script Web App).
 *    Fills candidate columns and includes the candidate's CV/Portfolio link.
 * 2. FormBold / Email (backup notification to Jamoka recruitment team).
 */

import { sendToFormBold } from './formbold';

export interface ApplicationPayload {
  positionTitle: string;
  department: string;
  location: string;
  fullName: string;
  email: string;
  phone: string;
  residencyStatus: string;
  portfolioOrCvUrl: string;
  coverNote?: string;
}

// Google Apps Script Web App endpoint for automatic Google Sheet row insertion
export const GOOGLE_APPS_SCRIPT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxKUgpmyypswdLd6hryfsPstI_vYVgiLzOFec43OQrZGeTkR_7FvVjkaTwseZszYBNb/exec';

export async function submitCareerApplication(payload: ApplicationPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const scriptUrl = GOOGLE_APPS_SCRIPT_WEBHOOK_URL.trim();
  let googleSuccess = false;

  // 1. Post to Google Sheet via Google Apps Script Web App
  if (scriptUrl) {
    try {
      const googlePayload = {
        action: 'job_application',
        timestamp: new Date().toISOString(),
        position: payload.positionTitle,
        department: payload.department,
        location: payload.location,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        residencyStatus: payload.residencyStatus,
        resumeUrl: 'N/A (Link provided below)', // Column G placeholder
        portfolioUrl: payload.portfolioOrCvUrl || '', // Column H (Candidate Link)
        coverNote: payload.coverNote || '', // Column I (Intro notes)
        hasFile: false,
        fileName: '',
        fileType: '',
        fileBase64: '',
      };

      await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(googlePayload),
        mode: 'no-cors',
      });
      googleSuccess = true;
    } catch (err) {
      console.warn('Google Sheets logging error:', err);
    }
  }

  // 2. FormBold backup notification to Jamoka HR inbox
  try {
    await sendToFormBold({
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      source: `Careers Portal - Application for ${payload.positionTitle}`,
      subject: `Job Application: ${payload.positionTitle} (${payload.fullName})`,
      message: `Position: ${payload.positionTitle}
Department: ${payload.department}
Location: ${payload.location}
Candidate: ${payload.fullName}
Email: ${payload.email}
Phone / WhatsApp: ${payload.phone}
Residency Status: ${payload.residencyStatus}
CV / Portfolio Link: ${payload.portfolioOrCvUrl}
Google Sheets Log: ${googleSuccess ? 'Logged successfully' : 'Dispatched to Apps Script'}

Candidate Statement / Introduction:
${payload.coverNote || 'N/A'}`,
    });
  } catch (err) {
    console.warn('FormBold backup notification warning:', err);
  }

  return {
    success: true,
    message: 'Application submitted successfully',
  };
}
