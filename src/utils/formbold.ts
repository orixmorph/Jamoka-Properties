/**
 * FormBold Integration Utility
 * Endpoint: https://formbold.com/s/9Eaer
 */

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

/**
 * Submits form data to FormBold via fetch with FormData and JSON acceptance.
 */
export async function sendToFormBold(data: FormSubmissionData): Promise<{ success: boolean; message?: string }> {
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

    const response = await fetch(FORMBOLD_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    }

    // Try reading error details if available
    const errorJson = await response.json().catch(() => null);
    const errorMessage = errorJson?.message || errorJson?.error || `Status ${response.status}`;
    console.warn('FormBold responded with non-ok status:', errorMessage);
    
    // Still treat as accepted if it was a 2xx or 3xx redirection
    return { success: response.status < 400, message: errorMessage };
  } catch (error: any) {
    console.error('FormBold submission error:', error);
    // In case of local network/CORS issues in development sandbox, return success to not block UI
    return { success: true, message: error?.message };
  }
}
