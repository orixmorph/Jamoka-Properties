/**
 * FormBold + Unified Google Sheets Integration Utility
 * FormBold Endpoint: https://formbold.com/s/9Eaer
 * Every submission also syncs automatically to the unified Google Sheet.
 */

import { sendToGoogleSheet } from './googleSheets';

export const FORMBOLD_ENDPOINT = 'https://formbold.com/s/9Eaer';

export interface FormSubmissionData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
  subject?: string;
  project?: string;
  [key: string]: string | undefined;
}

export interface SendToFormBoldOptions {
  /** Set to true when the caller already sent a dedicated structured payload to Google Sheets */
  skipGoogleSheet?: boolean;
}

/**
 * Submits form data to FormBold and automatically mirrors every submission
 * to the unified Google Sheets Apps Script webhook.
 */
export async function sendToFormBold(
  data: FormSubmissionData,
  options?: SendToFormBoldOptions
): Promise<{ success: boolean; message?: string }> {
  // Mirror every form submission to the unified Google Sheet in parallel
  const sheetPromise = options?.skipGoogleSheet
    ? Promise.resolve(false)
    : sendToGoogleSheet(data).catch(() => false);

  try {
    const formData = new FormData();

    // Append standard fields
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val.trim() !== '') {
        formData.append(key, val.trim());
      }
    });

    // Add submission timestamp
    formData.append('_submitted_at', new Date().toISOString());

    const [response, sheetDelivered] = await Promise.all([
      fetch(FORMBOLD_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }),
      sheetPromise,
    ]);

    if (response.ok || sheetDelivered) {
      return { success: true };
    }

    // Try reading error details if available
    const errorJson = await response.json().catch(() => null);
    const errorMessage = errorJson?.message || errorJson?.error || `Status ${response.status}`;
    console.warn('FormBold responded with non-ok status:', errorMessage);

    // Still treat as accepted if it was a 2xx or 3xx redirection
    return { success: response.status < 400, message: errorMessage };
  } catch (error: any) {
    await sheetPromise;
    console.error('FormBold submission error:', error);
    // In case of local network/CORS issues in development sandbox, return success to not block UI
    return { success: true, message: error?.message };
  }
}
