/**
 * Careers Application Submission Engine
 *
 * Transmits candidate application data directly to:
 * 1. Google Sheets (via your deployed Google Apps Script Web App).
 *    Fills candidate columns and includes:
 *    - Candidate's clean phone number
 *    - Direct 1-click WhatsApp Link (e.g., https://wa.me/971501234567)
 *    - Candidate's CV/Portfolio link
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

/**
 * Formats any candidate phone number into a direct 1-click WhatsApp wa.me link.
 * Handles +, spaces, dashes, leading zeroes, UAE local formats (e.g. 050 -> 97150),
 * and pre-fills a friendly greeting message.
 */
export function formatWhatsAppLink(phoneInput: string, candidateName: string, positionTitle: string): {
  cleanNumber: string;
  waLink: string;
} {
  if (!phoneInput) {
    return { cleanNumber: '', waLink: '' };
  }

  // Strip all non-digit characters
  let digits = phoneInput.replace(/\D/g, '');

  // Handle UAE local prefix: if applicant entered e.g. 0501234567 or 052... (10 digits starting with 0)
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '971' + digits.substring(1);
  } else if (digits.startsWith('00')) {
    // 00971... -> 971...
    digits = digits.substring(2);
  }

  if (!digits) {
    return { cleanNumber: phoneInput, waLink: '' };
  }

  // Pre-filled greeting so clicking the link immediately prepares a professional message
  const prefilledMessage = encodeURIComponent(
    `Hello ${candidateName || 'Candidate'}, thank you for applying for the ${positionTitle || 'open'} position at Jamoka Properties Dubai.`
  );

  const waLink = `https://wa.me/${digits}?text=${prefilledMessage}`;

  return {
    cleanNumber: digits,
    waLink,
  };
}

export async function submitCareerApplication(payload: ApplicationPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const scriptUrl = GOOGLE_APPS_SCRIPT_WEBHOOK_URL.trim();
  let googleSuccess = false;

  // Generate 1-click WhatsApp link
  const { cleanNumber, waLink } = formatWhatsAppLink(
    payload.phone,
    payload.fullName,
    payload.positionTitle
  );

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
        phoneClean: cleanNumber,
        whatsAppLink: waLink, // Direct 1-click WhatsApp URL
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
Phone: ${payload.phone}
Direct WhatsApp: ${waLink || payload.phone}
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
